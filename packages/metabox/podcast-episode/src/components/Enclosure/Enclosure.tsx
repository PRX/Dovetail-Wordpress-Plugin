import type { WP_REST_API_Error } from 'wp-types';
import type { dovetailEnclosureStatuses, DovetailAuthUpload } from '@_types/api';
import type { EpisodeData, EpisodeEnclosure } from '@/types/state/episode';
import { type ChangeEvent, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from 'axios';
import type { PostMetaBoxPayloadEnclosures } from '@/types/state/postMetabox';
import { AlertCircleIcon, BanIcon, CheckIcon, CircleAlertIcon, CircleCheckBigIcon, FileWarningIcon, LinkIcon, LoaderIcon, PauseIcon, PlayIcon, SkipBackIcon, Undo2Icon, UnlinkIcon, UploadIcon } from 'lucide-react';
import { PostMetaboxContext } from '@/lib/contexts/PostMetaboxContext';
import { cn, formatDuration } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type EnclosureStatus =
  'no-audio' |
  'media-uploading' |
  'audio-ready' |
  'media-error' |
  `dovetail-${(typeof dovetailEnclosureStatuses)[number]}`;

export type AudioInfo = {
  /**
   * Duration of audio in seconds.
   */
  duration: number,
}

export type EnclosureProps = {
  episode: EpisodeData,
  onChange?(enclosures: PostMetaBoxPayloadEnclosures): void
}

function getEnclosureStatus(episode: EpisodeData): EnclosureStatus {
  const { enclosure, dovetail } = episode || {};

  if ( enclosure?.url && dovetail?.id ) {
    return `dovetail-${dovetail.enclosure.status}`;
  }

  if (enclosure?.url) {
    return 'audio-ready';
  }

  return 'no-audio';
}

async function getAudioDuration(url: string) {
  return new Promise<number>((resolve, reject) => {

    if (!url?.trim()) {
      reject(new ErrorEvent('Empty URL'));
    }

    const audio = new Audio();

    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });

    audio.addEventListener('error', (error) => {
      reject(error);
    });

    audio.src = url;
  });
}

export function Enclosure({ episode: _episode, onChange }: EnclosureProps) {
  const { audioFormats, postStatus } = window.appLocalizer;
  const { state } = useContext(PostMetaboxContext);
  const { episode } = state || {};
  const { enclosure, dovetail } = episode || {};
  const { url, playbackUrl, playbackExpires, duration, filename: audioSrcFilename } = enclosure || {};
  const wasUploaded = `${url}`.startsWith('s3://');
  const regexAudioUrlPattern = `^https?:\\/\\/.+\\/[\\w\\.\\-%]+\\.(${audioFormats.join('|')})$`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<EnclosureStatus>(getEnclosureStatus(episode));
  const [remoteUrl, setRemoteUrl] = useState(!wasUploaded ? url : null);
  const [audioInfo, setAudioInfo] = useState<AudioInfo>({
    duration: dovetail.enclosure?.duration || duration || 0
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [seekTime, setSeekTime] = useState<number>();
  const [playing, setPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [editingRemoteUrl, setEditingRemoteUrl] = useState(false);
  const hasUnsavedChanges = (url !== _episode.enclosure?.url);
  const audioSrcUrl = hasUnsavedChanges ?
    // Audio has been edited. Could not have been saved yet, or is still processing.
    // Use enclosure URL when it is playable. This is for remote URL input, before saving.
    remoteUrl ||
    // Use dovetail uncut URL when uncut processing is complete. This is for uploads after saving while being processed.
    (dovetail.uncut && dovetail.uncut.status === 'complete' && dovetail.uncut.href) ||
    // Use playback URL after upload for as long as it exists and has not expired. This is for uploads before saving and while being processed.
    (playbackUrl && (!playbackExpires || playbackExpires < Date.now()) && playbackUrl) ||
    // Make sure any boolean failures fall though to an undefined value.
    undefined :
    // Otherwise, dovetail data should be saved and have accessible audio URL for processed audio.
    // Construct a dovetail enclosure URL. We do not want use the href from the dovetail enclosure
    // since it will be prefixed with analytics prefixes, and audio played in the admin should not
    // affect those metrics.
    (dovetail.uncut && dovetail.uncut.status === 'complete' && dovetail.uncut.href) ||
    // Legacy fallback to media for the brief period when the Dovetail API didn't support the `uncut` property.
    dovetail.enclosure?.status === 'complete' && dovetail.media?.[0].href ||
    undefined;
  const audioIsPlayable = `${audioSrcUrl}`.startsWith('http');

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  },[]);

  const doOnChange = useCallback((enclosuresData: PostMetaBoxPayloadEnclosures) => {
    // Trigger `onChange` callback.
    if ( onChange && typeof onChange === 'function') {
      onChange(enclosuresData);
    }
  }, [onChange]);

  const handleMainButtonClick = useCallback(() => {
    if (([
      'no-audio',
      'media-error'
    ] as EnclosureStatus[]).includes(status)) {
      // Open file upload dialog.
      openFileDialog();
    }
    if (([
      'audio-ready',
      'dovetail-processing',
      'dovetail-complete',
      'dovetail-incomplete'
    ] as EnclosureStatus[]).includes(status)) {
      // Play/Pause audio.
      setPlaying((isPlaying) => !isPlaying);
    }
  }, [status, openFileDialog]);

  const handleAudioLoadedMetadata = useCallback(() => {
    setAudioInfo({
      duration: audioRef.current.duration
    });
  }, []);

  const commitRemoteUrlChange = useCallback(async () => {
    const urlInput = urlInputRef.current;

    if (!urlInput) return;

    const newRemoteUrl = urlInput.value.trim();
    const { valid } = urlInput.validity;
    const hasUrlChanged = newRemoteUrl !== _episode.enclosure?.url;
    const wasUsingUploadedMedia = !!_episode.enclosure?.url?.startsWith('s3://');
    const isPublishedToDovetail = !!dovetail?.id;

    // Bail if:
    // - URL is empty and was using uploaded media
    // - URL is empty and is published in Dovetail
    // - Invalid input
    if (!valid || !newRemoteUrl) {
      setEditingRemoteUrl(false);
      if (!wasUsingUploadedMedia && !isPublishedToDovetail) {
        // User decided wants to clear the remote URL prior to first save.

        doOnChange({
          enclosure: {
            url: null,
            filename: null,
            dateUpdated: null,
            duration: null
          },
          dovetail: {
            uncut: null,
            media: null
          }
        });

        setAudioInfo({
          duration: 0
        });
        setRemoteUrl(null);
        setStatus('no-audio');
        setEditingRemoteUrl(false);
      }
      return
    };

    await getAudioDuration(newRemoteUrl)
      .then((audioDuration) => {
        doOnChange({
          enclosure: {
            url: newRemoteUrl,
            filename: newRemoteUrl.split('?')[0].split('/').pop(),
            dateUpdated: hasUrlChanged ? new Date() : _episode.enclosure?.dateUpdated || null,
            duration: audioDuration
          },
          dovetail: {
            uncut: {
              href: newRemoteUrl
            },
            media: [ { href: newRemoteUrl } ]
          }
        });

        setAudioInfo({
          duration: audioDuration
        });
        setRemoteUrl(null);
        setStatus('audio-ready');
        setEditingRemoteUrl(false);
      })
      .catch((_error: ErrorEvent) => {
        setRemoteUrl(null);
        setEditingRemoteUrl(false);
      });
  }, [_episode, dovetail, doOnChange])

  const handleRemoteUrlChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { validity, value } = evt.target;
    const newRemoteUrl = value.trim();

    if (!_episode.enclosure?.url && newRemoteUrl) {
      commitRemoteUrlChange();
    } else if (validity.valid) {
      setRemoteUrl(newRemoteUrl);
    }
  }, [_episode, commitRemoteUrlChange])

  const message = {
    'no-audio': (
      <div className='flex items-center gap-2'>
        <Input ref={urlInputRef} type='url'
          pattern={regexAudioUrlPattern}
          required
          placeholder='Paste remote URL to audio file...'
          onChange={handleRemoteUrlChange}
        />
      </div>
    ),
    'media-uploading': uploadProgress < 1 ? `Uploading Audio File...` : 'Upload Complete.',
    'audio-ready': null,
    'media-error': 'Oops! Upload failed.',
    'dovetail-processing': null,
    'dovetail-complete': null,
    'dovetail-incomplete': null,
    'dovetail-invalid': null,
    'dovetail-error': null
  }[status];
  const info = {
    'no-audio': <>Supported audio formats: <samp>{audioFormats.map((v) => `.${v}`).join(', ')}</samp></>,
    'media-uploading': `${Math.round(uploadProgress * 100)}%`,
    'audio-ready': null,
    'media-error': 'Try uploading your file again. If error persists, contact your Dovetail support representative.',
    'dovetail-processing': null,
    'dovetail-complete': null,
    'dovetail-incomplete': null,
    'dovetail-invalid': 'Invalid audio file provided.',
    'dovetail-error': 'There was an error processing episode audio. Try again by selecting another audio source, and saving post.',
  }[status];

  const handleAudioTimeUpdate = useCallback(() => {
    setAudioCurrentTime(audioRef.current.currentTime);
  }, []);

  function handleEditFileClick() {
    openFileDialog();
    setPlaying(false);
  }

  async function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    // Get selected file.
    const file = evt.target.files[0];

    // Clear input value since we don't want it submitted with post save,
    // and want to make sure if the audio change is undone, the user can still
    // select the same file again.
    // DO NOT trigger the change event, so we don't call this handler infinitely.
    evt.target.value = '';

    // Get signed upload URL.
    const signed = await axios.get<DovetailAuthUpload>(`/wp-json/dovetail/v1/auth/upload?filename=${file.name}`)
      .then((res) => res.data)
      .catch((err): null => {
        handleUploadError(err);
        return null;
      });

    // Start upload.
    const fd = new FormData();
    const headers = {
      'content-type': 'multipart/form-data'
    }
    const config: AxiosRequestConfig = {
      headers,
      onUploadProgress: handleUploadProgress
    }

    fd.append('file', file);

    setStatus('media-uploading');

    await axios.put(signed.uploadUrl, fd, config)
      .then(async () => {
        await getAudioDuration(signed.playbackUrl)
          .then((audioDuration) => {
            handleUploadComplete({
              url: signed.originalUrl,
              playbackUrl: signed.playbackUrl,
              playbackExpires: signed.expiration,
              filename: signed.filename,
              duration: audioDuration,
              dateUpdated: new Date()
            });
          })
          .catch((err) => {
            handleUploadError(err);
          });
      })
      .catch((err) => {
        handleUploadError(err);
      });
  }

  function handleUploadProgress(evt: AxiosProgressEvent) {
    // Update UI to show upload progress.
    setUploadProgress(evt.progress);
  }

  function handleUploadComplete(data: EpisodeEnclosure) {
    doOnChange({
      enclosure: data,
      dovetail: {
        uncut: { href: data.url },
        media: [{ href: data.url }]
      }
    });
    setAudioInfo({
      duration: data.duration
    });
    setStatus('audio-ready');
  }

  function handleUploadError(err: WP_REST_API_Error) {
    // Handle errors.
    console.log(err);
    setStatus('media-error');
  }

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'none';
    audioRef.current.addEventListener('timeupdate', handleAudioTimeUpdate);
    audioRef.current.addEventListener(
      'loadedmetadata',
      handleAudioLoadedMetadata
    );

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [handleAudioLoadedMetadata, handleAudioTimeUpdate])

  useEffect(() => {
    audioRef.current.src = audioSrcUrl;
    setPlaying(false);
  }, [audioSrcUrl])

  /**
   * Have to use `useLayoutEffect` so Safari can understand the `play` call
   * is a result of a user interaction. `useEffect` seems to disconnect that inference.
   * See https://lukecod.es/2020/08/27/ios-cant-play-youtube-via-react-useeffect/
   * Solution was for video playback, but same issue seems to apply to audio.
   */
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // biome-ignore lint/correctness/useHookAtTopLevel: We only want this running in client.
        useLayoutEffect(() => {
      if (playing) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }, [playing]);
  }

  useEffect(() => {
    setStatus(getEnclosureStatus(episode));
  }, [episode])

  useEffect(() => {
    setRemoteUrl(url?.startsWith('http') ? url : null);
  }, [url])

  return (
    <div data-status={status} className='max-w-full @container/enclosure'>
      <input type="file" accept={(audioFormats || []).map((v) => `.${v}`).join(', ')} style={{ display: 'none' }} onChange={handleChange} ref={fileInputRef} />
      <div className='grid @md/enclosure:grid-cols-[min-content_4fr] items-center justify-center gap-3'>
        <div className='justify-self-center'>
          <Button type='button'
            variant='ghost' size='icon'
            className={cn(
              'grid place-items-center [&_>_*]:col-span-full [&_>_*]:row-span-full w-[clamp(4rem,10cqw,5rem)] h-auto aspect-square rounded-full',
              {
                'text-sky-200 hover:text-sky-500': 'no-audio' === status,
                'hover:text-green-500 animate-color-cycle': ([
                  'media-uploading',
                  'dovetail-processing'
                ] as EnclosureStatus[]).includes(status),
                'text-sky-500 hover:text-green-500': ([
                  'audio-ready',
                  'dovetail-complete'
                ] as EnclosureStatus[]).includes(status),
                'text-rose-500 hover:text-sky-500': 'media-error' === status,
                'text-lime-500 hover:text-lime-500': 'dovetail-incomplete' === status,
                'text-orange-500 hover:text-orange-500': 'dovetail-invalid' === status,
                'text-rose-500 hover:text-rose-500': 'dovetail-error' === status,
              }
            )}
            disabled={([
              'media-uploading',
              'dovetail-invalid',
              'dovetail-error'
            ] as EnclosureStatus[]).includes(status) || (audioSrcUrl && !audioIsPlayable)}
            onClick={handleMainButtonClick}
            aria-label={{
              'no-audio': 'Upload Audio File',
              'media-uploading': 'Uploading...',
              'media-error': 'Media Error',
              'audio-ready': null,
              'dovetail-processing': !audioIsPlayable ? 'Processing Audio File...' : null,
              'dovetail-complete': null,
              'dovetail-incomplete': 'Incomplete',
              'dovetail-invalid': 'Invalid',
              'dovetail-error': 'error',
            }[status] || !playing ? 'Play' : 'Pause'}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='size-full' aria-hidden="true">
              <circle cx="50" cy="50" r="40" className='fill-none stroke-slate-200 stroke-4' />
              <circle cx="50" cy="50" r="40" pathLength={100} strokeLinecap='round' strokeDasharray={100}
                className={cn('fill-none stroke-current stroke-4', {
                  'animate-processing-spinner origin-center': 'dovetail-processing' === status || 'media-uploading' === status && 1 === uploadProgress
                })}
                {...('media-uploading' === status && {
                  strokeDashoffset: (1 - uploadProgress) * 100
                })}
              />
            </svg>
            {{
              'no-audio': <UploadIcon className='size-[40%]' />,
              'media-uploading': <UploadIcon className='size-[40%]' />,
              'media-error': <UploadIcon className='size-[40%]' />,
              'audio-ready': null,
              'dovetail-processing': !audioIsPlayable ? <LoaderIcon className='size-[40%] animate-spin' /> : null,
              'dovetail-incomplete': null,
              'dovetail-invalid': <FileWarningIcon className='size-[40%]' />,
              'dovetail-error': <CircleAlertIcon className='size-[40%]' />,
              'dovetail-complete': null,
            }[status] || (
              !playing ?
                <PlayIcon className='size-[40%]' /> :
                <PauseIcon className='size-[40%]' />
            )}
          </Button>
        </div>
        <div className='grid gap-1.5'>
          <div className='font-bold text-[clamp(var(--text-sm),3cqw,var(--text-xl))] break-all text-balance'>
            {message || (
              <div className='flex items-center gap-2'>
                {!editingRemoteUrl ?
                  (
                    <>
                    <span className='grow'>
                      <span className='max-w-[80ch] min-h-9 inline-block break-all'>{audioSrcFilename}</span>
                    </span>
                    {!([
                        'media-uploading',
                        'dovetail-processing'
                      ] as EnclosureStatus[]).includes(status) && (
                      <span className='flex flex-wrap gap-1 min-w-fit'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type='button' variant={wasUploaded ? 'outline' : 'ghost'} size='icon'
                              className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                              onClick={handleEditFileClick}
                            >
                              <UploadIcon className='size-full' />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Upload {url && wasUploaded ? 'New' : ''} Audio File</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type='button' variant={url && !wasUploaded ? 'outline' : 'ghost'} size='icon'
                              className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                              onClick={() => {
                                setEditingRemoteUrl(true);
                                setPlaying(false);
                              }}
                            >
                              <LinkIcon className='size-full' />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{url && !wasUploaded ? 'Change' : 'Use'} Remote Audio URL</TooltipContent>
                        </Tooltip>
                      </span>
                    )}
                    </>
                  ) : (
                    <>
                      <Input ref={urlInputRef} type='url'
                        defaultValue={remoteUrl}
                        pattern={regexAudioUrlPattern}
                        required
                        placeholder='Paste remote URL to audio file...'
                        onChange={handleRemoteUrlChange}
                        onFocus={(evt) => { evt.target.select() }}
                        autoFocus
                      />
                      {(!!remoteUrl?.trim().length || !dovetail?.id) && remoteUrl !== url && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type='button' variant={url && !wasUploaded ? 'outline' : 'ghost'} size='icon'
                              className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                              onClick={() => {
                                commitRemoteUrlChange();
                              }}
                            >
                              {!wasUploaded && !remoteUrl?.trim().length ? (
                                <UnlinkIcon className='size-full' />
                              ) : (
                                <CheckIcon className='size-full' />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{!wasUploaded && !remoteUrl?.trim().length ? 'Remove' : 'Confirm'}</TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type='button' variant={url && !wasUploaded ? 'outline' : 'ghost'} size='icon'
                            className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                            onClick={() => {
                              setRemoteUrl(!wasUploaded ? url : null);
                              setEditingRemoteUrl(false);
                            }}
                          >
                            <BanIcon className='size-full' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Cancel</TooltipContent>
                      </Tooltip>
                    </>
                  )
                }
              </div>
            )}
          </div>
          <div className='text-balance leading-none'>
            {info || (
              <div className='grid gap-2'>
                <div className='flex flex-wrap gap-2'>
                  { audioInfo?.duration ? <Badge variant='secondary'>{formatDuration(audioInfo.duration)}</Badge> : <Skeleton className='w-[8ch] h-[1em]' /> }
                  { 'dovetail-processing' === status && <Badge variant='outline'><LoaderIcon className='text-sky-500 animate-spin' />Dovetail Processing Audio...</Badge> }
                  { 'dovetail-complete' === status && !hasUnsavedChanges && <Badge variant='outline'><CircleCheckBigIcon className='text-green-500' />Dovetail Audio {'publish' === postStatus ? 'Published' : 'Ready'}</Badge> }
                  { !!dovetail?.enclosure?.size && 'dovetail-incomplete' === status && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className='bg-orange-500 text-white'><AlertCircleIcon />Dovetail Action Required</Badge>
                      </TooltipTrigger>
                      <TooltipContent className='w-[60ch]'>
                        <p>Changes to audio are not ready to be published in Dovetail. This is usually means some action in regards to ad placements is needed.</p>
                        <p>Once all incomplete actions are completed, the audio change will be processed and updated in your Dovetail feeds.</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  { hasUnsavedChanges && (
                    <Tooltip>
                      <Badge className='pr-0.5 gap-2'>
                        { 'publish' === postStatus ? 'Unpublished Audio Change' : 'Unsaved Audio Change' }
                        <TooltipTrigger asChild>
                          <Button type='button' variant='secondary' size='icon'
                            className='w-[1.5em] h-auto aspect-square p-0.5 rounded-full rounded-s-none'
                            onClick={() => {
                              setPlaying(false);
                              setEditingRemoteUrl(false);
                              setStatus(getEnclosureStatus(_episode));
                              setAudioInfo({
                                duration: _episode.enclosure?.duration || 0
                              })
                              doOnChange(_episode.enclosure ? {
                                enclosure: _episode.enclosure,
                                dovetail: {
                                  uncut: _episode.dovetail.uncut,
                                  media: _episode.dovetail.media
                                }
                              } : null);
                            }}
                          >
                            <Undo2Icon className='size-full' />
                          </Button>
                        </TooltipTrigger>
                      </Badge>
                      <TooltipContent>Undo Audio Change</TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className='flex items-center gap-3'>
                  <Button type='button' size='icon' variant='ghost' className='rounded-full aspect-square' aria-label='Return To Beginning'
                    onClick={() => {
                      audioRef.current.currentTime = 0;
                    }}
                  ><SkipBackIcon /></Button>
                  <Slider min={0} max={audioInfo.duration} step={0.1} value={[seekTime || audioCurrentTime]}
                    onValueChange={(v) => {
                      setSeekTime(v[0]);
                    }}
                    onValueCommit={(v) => {
                      setSeekTime(null);
                      setAudioCurrentTime(v[0]);
                      audioRef.current.currentTime = v[0];
                    }}
                  />
                  <span className='flex items-center gap-1 h-[1em] font-mono'>
                    <span>{formatDuration(seekTime || audioCurrentTime)}</span>
                    <Separator orientation='vertical' />
                    <span className='text-gray-300'>{formatDuration(audioInfo.duration)}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
