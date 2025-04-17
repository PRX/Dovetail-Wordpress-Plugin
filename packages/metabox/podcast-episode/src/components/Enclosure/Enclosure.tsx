import type { WP_REST_API_Attachment, WP_REST_API_Error } from 'wp-types';
import type { dovetailEnclosureStatuses } from '@_types/api';
import type { EpisodeData, EpisodeEnclosure } from '@/types/state/episode';
import { type ChangeEvent, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios, { type AxiosProgressEvent, type AxiosRequestConfig, type AxiosResponse } from 'axios';
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
  onChange?(enclosure: EpisodeEnclosure): void
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

export function Enclosure({ onChange}: EnclosureProps) {
  const { audioFormats, postStatus } = window.appLocalizer;
  const { state, options } = useContext(PostMetaboxContext);
  const { episode, podcast } = state || {};
  const { enclosure, dovetail } = episode || {};
  const { mediaId, url, duration, filename: audioSrcFilename } = enclosure || {};
  const regexAudioUrlPattern = `^https?:\\/\\/.+\\/[\\w\\.\\-%]+\\.(${audioFormats.join('|')})$`;
  const initialEpisode = useRef<EpisodeData>(episode);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<EnclosureStatus>(getEnclosureStatus(episode));
  const [attachedMedia, setAttachedMedia] = useState(options?.attachedMedia)
  const [media, setMedia] = useState<WP_REST_API_Attachment>(attachedMedia.get(`${mediaId}`));
  const [remoteUrl, setRemoteUrl] = useState(!mediaId ? url : null);
  const [audioInfo, setAudioInfo] = useState<AudioInfo>({
    duration: dovetail.enclosure?.duration || media?.media_details?.length as number || duration || 0
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [seekTime, setSeekTime] = useState<number>();
  const [playing, setPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [editingRemoteUrl, setEditingRemoteUrl] = useState(false);
  const hasUnsavedChanges = (url !== initialEpisode.current?.enclosure?.url);
  const useOriginalUrl = hasUnsavedChanges || 'publish' !== postStatus || 'complete' !== dovetail?.enclosure?.status;
  const audioSrcUrl = useOriginalUrl ?
    // Try to use initial dovetail media's original URL in cases when offloaded media was deleted and url is missing.
    remoteUrl || url || initialEpisode.current?.dovetail?.media?.[0]?.originalUrl :
    // Construct a dovetail enclosure URL. We do not want use the href from the dovetail enclosure
    // since it will be prefixed with analytics prefixes, and audio played in the admin should not
    // affect those metrics.
    [
      podcast.enclosureTemplate.replace(/\{[^\}]+\}/g, ''),
      podcast.id,
      dovetail.id,
      // Dovetail audio URL doesn't require a filename, so we will use the
      // enclosure filename for consistency in what will be displayed, since
      // depending on what actions are taken in Dovetail, the Dovetail enclosure href filename
      // can change. Even the original source of the media for the enclosure can be
      // altered to a Dovetail URL.
      audioSrcFilename
    ].join('/');

  // Store initial episode data.
  initialEpisode.current = initialEpisode.current || episode;

  const doOnChange = useCallback((enclosure: EpisodeEnclosure) => {
    // Trigger `onChange` callback.
    if ( onChange && typeof onChange === 'function') {
      onChange(enclosure);
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
  }, [status]);

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
    const hasUrlChanged = newRemoteUrl !== initialEpisode.current?.enclosure?.url;
    const wasUsingMedia = !!initialEpisode.current?.enclosure?.mediaId;
    const isPublishedToDovetail = !!dovetail?.id;

    // Bail if:
    // - URL is empty and was using media
    // - URL is empty and is published in Dovetail
    // - Invalid input
    if (!valid || (!newRemoteUrl && (wasUsingMedia || isPublishedToDovetail))) {
      setEditingRemoteUrl(false);
      return
    };

    await getAudioDuration(newRemoteUrl)
      .then((audioDuration) => {
        const newEnclosure = {
          url: newRemoteUrl,
          filename: newRemoteUrl.split('?')[0].split('/').pop(),
          dateUpdated: hasUrlChanged ? new Date() : initialEpisode.current?.enclosure?.dateUpdated || null,
          duration: audioDuration
        } as EpisodeEnclosure;

        doOnChange(newEnclosure);

        setAudioInfo({
          duration: audioDuration
        });
        setRemoteUrl(null);
        setStatus('audio-ready');
        setEditingRemoteUrl(false);
      })
      .catch((error: ErrorEvent) => {
        if (!newRemoteUrl) {
          const newEnclosure = {
            url: null,
            filename: null,
            dateUpdated: initialEpisode.current?.enclosure?.dateUpdated || null,
            duration: null
          } as EpisodeEnclosure;

          doOnChange(newEnclosure);
        }

        setAudioInfo({
          duration: null
        });
        setRemoteUrl(null);
        setStatus('no-audio');
        setEditingRemoteUrl(false);
      });
  }, [onChange, remoteUrl, dovetail?.id])

  const handleRemoteUrlChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { validity, value } = evt.target;
    const newRemoteUrl = value.trim();

    if (!initialEpisode.current?.enclosure?.url && newRemoteUrl) {
      commitRemoteUrlChange();
    } else if (validity.valid) {
      setRemoteUrl(newRemoteUrl);
    }
  }, [commitRemoteUrlChange, setRemoteUrl])

  const message = {
    'no-audio': (
      <div className='flex items-center gap-2'>
        <Input ref={urlInputRef} type='url'
          pattern={regexAudioUrlPattern}
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
    'media-uploading': uploadProgress < 1 ? `${Math.round(uploadProgress * 100)}%` : 'Media is being added to your library...',
    'audio-ready': null,
    'media-error': 'Try uploading your file again. If error persists, contact your Dovetail support representative.',
    'dovetail-processing': null,
    'dovetail-complete': null,
    'dovetail-incomplete': null,
    'dovetail-invalid': 'Invalid audio file provided.',
    'dovetail-error': 'There was an error processing episode audio. Try again by selecting another audio source, and saving post.',
  }[status];

  function openFileDialog() {
    fileInputRef.current?.click();
  }

  function handleAudioTimeUpdate() {
    setAudioCurrentTime(audioRef.current.currentTime);
  }

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

    // Check for attached media that has the same file name and size as the selected file.
    const existingMedia = [...attachedMedia.values()].find(({media_details: { filesize }, source_url}) => {
      const filename = source_url.split('/').pop();
      return filename === file.name && filesize === file.size;
    });

    if (existingMedia) {
      // This file was uploaded before but page may have been refreshed,
      // or previous edit was abandoned.
      handleUploadComplete(existingMedia);
      return;
    }

    // Start upload.
    const fd = new FormData();
    const headers = {
      'Content-Disposition': `attachment; filename=${file.name}`,
      'X-Wp-Nonce': window.appLocalizer.nonce,
      'content-type': file.type
    }
    const config: AxiosRequestConfig = {
      headers,
      onUploadProgress: handleUploadProgress
    }
    fd.append('file', file);
    fd.append('title', file.name);
    fd.append('post', `${window.appLocalizer.postId}`);

    setStatus('media-uploading');

    await axios.post<WP_REST_API_Attachment, AxiosResponse<WP_REST_API_Attachment>, FormData>('/wp-json/wp/v2/media', fd, config)
      .then((res) => {
        handleUploadComplete(res.data);
      })
      .catch((err) => {
        handleUploadError(err);
      });
  }

  function handleUploadProgress(evt: AxiosProgressEvent) {
    // Update UI to show upload progress.
    setUploadProgress(evt.progress);
  }

  function handleUploadComplete(data: WP_REST_API_Attachment) {
    const mediaDuration = data.media_details.length as number;
    doOnChange({
      mediaId: data.id,
      url: data.source_url,
      filename: data.source_url.split('/').pop(),
      dateUpdated: new Date(),
      duration: mediaDuration
    })
    setAttachedMedia((currentAttachedMedia) => {
      const newAttachedMedia = new Map(currentAttachedMedia);
      newAttachedMedia.set(`${data.id}`, data);
      return newAttachedMedia;
    })
    setMedia(data);
    setAudioInfo({
      duration: mediaDuration
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
  }, [])

  useEffect(() => {
    if (!audioSrcUrl) return;

    audioRef.current.src = audioSrcUrl;
  }, [audioSrcUrl])

  /**
   * Have to use `useLayoutEffect` so Safari can understand the `play` call
   * is a result of a user interaction. `useEffect` seems to disconnect that inference.
   * See https://lukecod.es/2020/08/27/ios-cant-play-youtube-via-react-useeffect/
   * Solution was for video playback, but same issue seems to apply to audio.
   */
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (playing) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }, [playing]);
  }

  useEffect(() => {
    if (mediaId && (!media || media.id !== mediaId)) {
      (async () => {
        await axios.get<WP_REST_API_Attachment>(`/wp-json/wp/v2/media/${mediaId}`)
          .then((res) => {
            setMedia(res.data);
          });
      })()
    }
  }, [mediaId, media])

  useEffect(() => {
    if (initialEpisode.current?.enclosure?.dateUpdated != episode?.enclosure?.dateUpdated) {
      initialEpisode.current = episode;
    }
    setStatus(getEnclosureStatus(episode));
  }, [episode?.dovetail?.enclosure?.status])

  useEffect(() => {
    setStatus(getEnclosureStatus(episode));
  }, [episode?.enclosure?.url])

  useEffect(() => {
    setRemoteUrl(!mediaId ? url : null);
  }, [mediaId, url])

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
                'text-sky-500 hover:text-sky-500 animate-color-cycle': ([
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
            ] as EnclosureStatus[]).includes(status)}
            onClick={handleMainButtonClick}
            aria-label={{
              'no-audio': 'Upload Audio File',
              'media-uploading': 'Uploading...',
              'media-error': 'Media Error',
              'audio-ready': null,
              'dovetail-processing': null,
              'dovetail-complete': null,
              'dovetail-incomplete': 'Incomplete',
              'dovetail-invalid': 'Invalid',
              'dovetail-error': 'error',
            }[status] || !playing ? 'Play' : 'Pause'}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='size-full'>
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
              'dovetail-processing': null,
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
                      <Tooltip>
                        <TooltipTrigger asChild><span className='max-w-[80ch] inline-block break-all'>{audioSrcFilename}</span></TooltipTrigger>
                        <TooltipContent>
                          {useOriginalUrl ? (
                            <p>Listening to source audio file:</p>
                          ) : (
                            <p>Listening to Dovetail audio file:</p>
                          )}
                          <p><samp>{audioSrcUrl}</samp></p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    {!([
                        'media-uploading',
                        'dovetail-processing'
                      ] as EnclosureStatus[]).includes(status) && (
                      <span className='flex flex-wrap gap-1 min-w-fit'>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type='button' variant={mediaId ? 'outline' : 'ghost'} size='icon'
                              className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                              onClick={handleEditFileClick}
                            >
                              <UploadIcon className='size-full' />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Upload {mediaId ? 'New' : ''} Audio File</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button type='button' variant={url && !mediaId ? 'outline' : 'ghost'} size='icon'
                              className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                              onClick={() => {
                                setEditingRemoteUrl(true);
                                setPlaying(false);
                              }}
                            >
                              <LinkIcon className='size-full' />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{url && !mediaId ? 'Change' : 'Use'} Remote Audio URL</TooltipContent>
                        </Tooltip>
                      </span>
                    )}
                    </>
                  ) : (
                    <>
                    <Input ref={urlInputRef} type='url'
                      defaultValue={remoteUrl}
                      pattern={regexAudioUrlPattern}
                      placeholder='Paste remote URL to audio file...'
                      onChange={handleRemoteUrlChange}
                      onFocus={(evt) => { evt.target.select() }}
                      autoFocus
                    />
                    {(!!remoteUrl?.trim().length || !dovetail?.id) && remoteUrl !== url && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type='button' variant={url && !mediaId ? 'outline' : 'ghost'} size='icon'
                            className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                            onClick={() => {
                              commitRemoteUrlChange();
                            }}
                          >
                            {!mediaId && !remoteUrl?.trim().length ? (
                              <UnlinkIcon className='size-full' />
                            ) : (
                              <CheckIcon className='size-full' />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{!mediaId && !remoteUrl?.trim().length ? 'Remove' : 'Confirm'}</TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type='button' variant={url && !mediaId ? 'outline' : 'ghost'} size='icon'
                          className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                          onClick={() => {
                            setRemoteUrl(!mediaId ? url : null);
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
                              setEditingRemoteUrl(false);
                              doOnChange(initialEpisode.current?.enclosure || null);
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
