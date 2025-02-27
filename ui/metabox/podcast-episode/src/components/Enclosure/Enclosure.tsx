import type { WP_REST_API_Attachment, WP_REST_API_Error } from 'wp-types';
import type { EpisodeData, EpisodeEnclosure } from '@/types/state/episode';
import React, { type ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import axios, { type AxiosProgressEvent, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { AlertCircleIcon, CircleAlertIcon, CircleCheckBigIcon, CircleEllipsisIcon, CircleSlashIcon, FileWarningIcon, LinkIcon, LoaderCircleIcon, LoaderIcon, LoaderPinwheelIcon, PauseIcon, PlayIcon, SkipBackIcon, UploadIcon, XIcon } from 'lucide-react';
import { PostMetaboxContext } from '@/lib/contexts/PostMetaboxContext';
import { cn, formatDuration } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DovetailEnclosureStatus, dovetailEnclosureStatuses } from '@/types/api';
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

  if ( dovetail?.id ) {
    return `dovetail-${dovetail.enclosure.status}`;
  }

  if (enclosure?.url) {
    return 'audio-ready';
  }

  return 'no-audio';
}

export function Enclosure({ onChange}: EnclosureProps) {
  const { audioFormats, postStatus } = window.appLocalizer;
  const { state, options } = useContext(PostMetaboxContext);
  const { episode, podcast } = state || {};
  const { enclosure, dovetail } = episode || {};
  const { mediaId, url, filename: audioSrcFilename } = enclosure || {};
  const regexAudioUrlPattern = `^https?:\\/\\/.+\\/[a-z0-9_\\-]+\\.(${audioFormats.join('|')})$`;
  const initialEpisode = useRef<EpisodeData>(episode);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<EnclosureStatus>(getEnclosureStatus(episode));
  const [attachedMedia, setAttachedMedia] = useState(options?.attachedMedia)
  const [media, setMedia] = useState<WP_REST_API_Attachment>(attachedMedia.get(`${mediaId}`));
  const [audioInfo, setAudioInfo] = useState<AudioInfo>({
    duration: dovetail.enclosure?.duration || media?.media_details?.length as number || 0
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [editingRemoteUrl, setEditingRemoteUrl] = useState(false);
  const hasUnsavedChanges = (url !== initialEpisode.current?.enclosure?.url);
  const hasEnclosureUrl = !!url;
  const useEnclosureUrl = hasUnsavedChanges || !dovetail?.id || 'publish' !== postStatus || 'complete' !== dovetail.enclosure.status;
  const audioSrcUrl = useEnclosureUrl ? url : [
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

  const handleRemoteUrlChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const newRemoteUrl = evt.target.value.trim();
    const { valid } = evt.target.validity;
    const hasNewRemoteUrl = !!newRemoteUrl?.length;

    // Bail if:
    // - Empty value
    // - Invalid input
    if (!hasNewRemoteUrl || !valid) return;

    doOnChange({
      url: newRemoteUrl,
      filename: newRemoteUrl.split('/').pop(),
      dateUpdated: new Date()
    });
    setStatus('audio-ready');
    setEditingRemoteUrl(false);
  }, [onChange])

  const message = {
    'no-audio': (
      <div className='flex items-center gap-2'>
        <Input type='url' pattern={regexAudioUrlPattern} ref={urlInputRef}
          placeholder='Paste remote URL to audio file...'
          onChangeCapture={handleRemoteUrlChange}
        />
      </div>
    ),
    'media-uploading': `Uploading Audio File...`,
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

  function openFileDialog() {
    fileInputRef.current?.click();
  }

  function handleAudioTimeUpdate() {
    setAudioCurrentTime(audioRef.current.currentTime)
  }

  function handleEditFileClick() {
    openFileDialog();
    setPlaying(false);
  }

  async function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    // Start upload.
    const file = evt.target.files[0];
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
    doOnChange({
      mediaId: data.id,
      url: data.source_url,
      filename: data.source_url.split('/').pop(),
      dateUpdated: new Date()
    })
    setAttachedMedia((currentAttachedMedia) => {
      const newAttachedMedia = new Map(currentAttachedMedia);
      newAttachedMedia.set(`${data.id}`, data);
      return newAttachedMedia;
    })
    setMedia(data);
    setStatus('audio-ready');
  }

  function handleUploadError(err: WP_REST_API_Error) {
    // Handle errors.
    console.log(err);
    setStatus('media-error');
  }

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';
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

  useEffect(() => {
    if (playing) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [playing])

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
    if (initialEpisode.current?.enclosure.dateUpdated != episode?.enclosure?.dateUpdated) {
      initialEpisode.current = episode;
    }
    setStatus(getEnclosureStatus(episode));
  }, [episode?.dovetail?.enclosure?.status])

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
                  'animate-processing-spinner origin-center': 'dovetail-processing' === status
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
                {!editingRemoteUrl && !([
                  'media-uploading',
                  'dovetail-processing'
                ] as EnclosureStatus[]).includes(status) ?
                  (
                    <>
                    <span className='grow'>
                      <Tooltip>
                        <TooltipTrigger asChild><span className='max-w-[80ch] inline-block break-all'>{audioSrcFilename}</span></TooltipTrigger>
                        <TooltipContent>
                          {useEnclosureUrl ? (
                            <p>Listening to source audio file:</p>
                          ) : (
                            <p>Listening to Dovetail audio file:</p>
                          )}
                          <p><samp>{audioSrcUrl}</samp></p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
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
                    </>
                  ) : (
                    <>
                    <Input type='url' defaultValue={!mediaId ? url : null} pattern={regexAudioUrlPattern} ref={urlInputRef}
                      placeholder='Paste remote URL to audio file...'
                      onChangeCapture={handleRemoteUrlChange}
                      onFocus={(evt) => { evt.target.select() }}
                      autoFocus
                    />
                    <Button type='button' variant={url && !mediaId ? 'outline' : 'ghost'} size='icon'
                      className='w-[1.5em] min-w-[1.5rem] h-auto p-1 aspect-square'
                      title='Upload New Audio File'
                      onClick={() => {
                        setEditingRemoteUrl(false);
                      }}
                    >
                      <XIcon className='size-full' />
                    </Button>
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
                  { hasEnclosureUrl && !dovetail?.id && <Badge variant='outline'><CircleEllipsisIcon className='text-sky-500' />Not Published To Dovetail</Badge> }
                  { 'dovetail-processing' === status && <Badge variant='outline'><LoaderIcon className='text-sky-500 animate-spin' />Dovetail Processing Audio...</Badge> }
                  { 'dovetail-complete' === status && <Badge variant='outline'><CircleCheckBigIcon className='text-green-500' />Published To Dovetail</Badge> }
                  { 'dovetail-incomplete' === status && (
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
                    'publish' === postStatus ? (
                      <Badge>Unpublished Audio Change</Badge>
                    ) : (
                      <Badge>Unsaved Audio Change</Badge>
                    )
                  )}
                </div>
                <div className='flex items-center gap-3'>
                  <Button type='button' size='icon' variant='ghost' className='rounded-full aspect-square' aria-label='Return To Beginning'
                    onClick={() => {
                      audioRef.current.currentTime = 0;
                    }}
                  ><SkipBackIcon /></Button>
                  <Slider min={0} max={audioInfo.duration} step={0.1} value={[audioCurrentTime]} onValueChange={(v) => {
                    audioRef.current.currentTime = v[0];
                  }} />
                  <span className='flex items-center gap-1 h-[1em] font-mono'>
                    <span>{formatDuration(audioCurrentTime)}</span>
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
