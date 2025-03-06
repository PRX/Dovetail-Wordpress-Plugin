import { dovetailEpisodeTypes, type DovetailEpisode, type DovetailEpisodeType, type DovetailPodcast } from '@/types/api';
import { type PostMetaboxAction, POST_META_BOX_KEY, type PostMetaboxOptions, type PostMetaboxState } from '@/types/state/postMetabox';
import type { EpisodeData, EpisodeEnclosure } from '@/types/state/episode';
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react';
import axios from 'axios';
import { PodcastIcon, DiamondPlusIcon, EllipsisVerticalIcon, ReplaceIcon, ChevronDownIcon, TrashIcon, AlertCircleIcon, Undo2Icon, EraserIcon } from 'lucide-react';
import { useShowHide } from '@/hooks/use-show-hide';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Enclosure } from '@/components/Enclosure';
import { PostMetaboxContext } from '@/lib/contexts/PostMetaboxContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useInterval } from '@/hooks/use-Interval';
import { useEditorSaving } from '@/hooks/use-editor-saving';
import { WP_Post, WP_REST_API_Post } from 'wp-types';
import { Skeleton } from '@/components/ui/skeleton';

export type WP_REST_API_Post_With_Meta_Data<T> = WP_REST_API_Post & {
  meta: Partial<T>
}

export type PostMetaboxProps = {
  /**
   * Name of field used to save episode metadata.
   */
  field: string,

  /**
   * Current episode metadata.
   */
  episode: EpisodeData,

  /**
   * Options data for the meta box that need to be derived from the backend.
   */
  options: PostMetaboxOptions
};

export type PostMetaboxControlProps = {
  label: string,
  children: React.ReactNode
  forId?: string
};

const defaultPostMetaboxState = {
  podcast: null,
  episode: {
    dovetail: {
      id: null,
      enclosure: null,
      itunesType: 'full',
      explicit: null,
      seasonNumber: null,
      episodeNumber: null,
      author: null
    }
  }
} as PostMetaboxState;

function postMetaboxStateReducer(state: PostMetaboxState, action: PostMetaboxAction): PostMetaboxState {
  const { episode } = state;
  const { dovetail, enclosure } = episode || {};

  switch (action.type) {
    case 'SET_TO_DEFAULT':
      return {
        ...defaultPostMetaboxState
      }

    case 'SET_PODCAST':
      return {
        ...state,
        podcast: action.payload
      }

    case 'SET_PODCAST_TO_DEFAULT':
      return {
        ...state,
        podcast: defaultPostMetaboxState.podcast
      }

    case 'SET_EPISODE':
      return {
        ...state,
        episode: action.payload
      }

    case 'UPDATE_EPISODE':
      return {
        ...state,
        episode: {
          ...episode,
          ...action.payload
        }
      }

    case 'SET_EPISODE_ENCLOSURE':
      return {
        ...state,
        episode: {
          ...episode,
          enclosure: action.payload,
          dovetail: {
            ...dovetail,
            media: [
              { href: action.payload.url }
            ]
          }
        }
      }

    case 'UPDATE_EPISODE_ENCLOSURE':
      return {
        ...state,
        episode: {
          ...episode,
          enclosure: {
            ...enclosure,
            ...action.payload
          },
          dovetail: {
            ...dovetail,
            media: [
              { href: action.payload.url }
            ]
          }
        }
      }

      case 'UPDATE_EPISODE_DOVETAIL':
        return {
          ...state,
          episode: {
            ...episode,
            dovetail: {
              ...dovetail,
              ...action.payload,

              /**
               * Following props should only be set on the server.
               * Enforce their original values here in case the payload
               * unintentionally overrides them.
               */
              id: dovetail.id
            }
          }
        }

    default:
      return state;
  }
}

function PodcastThumbnail({ podcast }: { podcast: DovetailPodcast } ) {
  const { itunesImage, feedImage } = podcast;
  const image = feedImage || itunesImage;
  return image ? <img className='w-full h-auto aspect-square object-cover' src={image.href} /> : <PodcastIcon className='size-full h-auto aspect-square' />
}

function PodcastsMenu({ podcasts, onSelect }: {podcasts: DovetailPodcast[], onSelect(podcast: DovetailPodcast): void}) {
  const [filtered, setFiltered] = useState(podcasts);

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { value } = evt.target;
     setFiltered( podcasts.filter((podcast) => podcast.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) )
  }

  return (
    <DialogContent className='grid grid-rows-[min-content_1fr]'>
      <DialogHeader>
        <DialogTitle>Select A Podcast</DialogTitle>
        <DialogDescription>
          <Input type='text' placeholder='Filter Podcasts...' onChange={handleChange} />
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className='min-h-fit max-h-full rounded-md border border-slate-300'>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-2 p-4'>
        { filtered.map((podcast) => {
            const { title, id } = podcast;

            return (
            <Button size='lg' variant='ghost' className='grid grid-cols-[3rem_1fr] grid-rows-[minmax(3rem,auto)] items-center justify-items-start gap-3 h-auto p-3 leading-none text-base text-start text-balance whitespace-normal' onClick={() => { onSelect(podcast) }} key={id}>
              <PodcastThumbnail podcast={podcast} />
              {title}
            </Button>
          );
        }) }
        </div>
        <ScrollBar />
      </ScrollArea>
    </DialogContent>
  )
}

function PostMetaboxControl({ children, forId, label }: PostMetaboxControlProps) {
  return (
    <div className='flex flex-wrap gap-2 items-center p-2 bg-white/70 rounded'>
      <label htmlFor={forId} className='grow font-semibold'>{label}</label>
      {children}
    </div>
  )
}

function PostMetabox({ field, episode: _episode, options }: PostMetaboxProps) {
  const { postId, postTitle } = window.appLocalizer;
  const { podcasts } = options;
  const [isSaving, isAfterSave] = useEditorSaving();
  const [isUiLocked, setIsUiLocked] = useState(false);
  const [initialEpisodeData, setInitialEpisodeData] = useState(_episode);
  const [state, dispatch] = useReducer(postMetaboxStateReducer, {
    ...defaultPostMetaboxState,
    podcast: podcasts?.find(({ id }) => initialEpisodeData?.podcastId === id),
    episode: {
      ...defaultPostMetaboxState.episode,
      ...initialEpisodeData
    }
  } as PostMetaboxState);
  const { episode, podcast } = state;
  const { dovetail } = episode;
  const hasAdditionalFieldsValues = dovetail && Object.entries(dovetail)
    .filter(([k]) => ['cleanTitle', 'seasonNumber', 'episodeNumber', 'author'].includes(k))
    .reduce((a, [,v]) => a || !!v, false);
  const selectPodcastDialog = useShowHide();
  const alertRestEpisodeDialog = useShowHide();
  const additionalFields = useShowHide(hasAdditionalFieldsValues);

  console.log('Episode', episode);
  console.log('Options', options);
  console.log('Podcast', podcast);

  function setEpisode(payload: EpisodeData) {
    dispatch({ type: 'SET_EPISODE', payload });
    dispatch({ type: 'SET_PODCAST',
      payload: podcasts?.find(({ id }) => payload.podcastId === id)
    });
  }

  function resetEpisode() {
    dispatch({ type: 'SET_TO_DEFAULT' });
  }

  function restoreEpisode() {
    dispatch({ type: 'UPDATE_EPISODE', payload: initialEpisodeData });
    dispatch({ type: 'SET_PODCAST',
      payload: podcasts?.find(({ id }) => initialEpisodeData?.podcastId === id)
    });
  }

  function setEpisodePodcastId(data: DovetailPodcast) {
    dispatch({ type: 'UPDATE_EPISODE', payload: {
      podcastId: data.id
    }});
    dispatch({ type: 'SET_PODCAST', payload: data});
  }

  function handleEnclosureChange(payload: EpisodeEnclosure) {
    dispatch({ type: 'SET_EPISODE_ENCLOSURE', payload });
  }

  function updateEpisodeDovetail(payload: Partial<DovetailEpisode>) {
    dispatch({ type: 'UPDATE_EPISODE_DOVETAIL', payload });
  }
useEffect(() => {
  // Only lock once is is locked.
  setIsUiLocked((locked) => isSaving || locked );
}, [isSaving]);

useEffect(() => {
    if (!isAfterSave) return;

    // Update local episode data with last saved data.
    (async () => {
      const res = await axios.get<WP_REST_API_Post_With_Meta_Data<{
        [POST_META_BOX_KEY]: EpisodeData
      }>>(`/wp-json/wp/v2/posts/${postId}`);
      const { meta } = res.data || {};
      const { [POST_META_BOX_KEY]: episodeMetaData } = (!Array.isArray(meta) && meta) || {};

      if (episodeMetaData) {
        setEpisode(episodeMetaData);
      } else {
        resetEpisode();
      }

      // Treat block editor after save as a "page refresh" of the classic editor.
      // Update initial episode data.
      setInitialEpisodeData(episodeMetaData || null);

      setIsUiLocked(false);
    })()
  }, [isAfterSave])

  useInterval<DovetailEpisode>(async () => {
    const { id, enclosure } = dovetail || {};

    const isProcessing = 'processing' === enclosure?.status;

    if (!id || !isProcessing) return null;

    const res = await axios.get<DovetailEpisode>(`/wp-json/dovetail/v1/episodes/${id}`);

    return res.data;
  }, (data) => {
    const { id, enclosure } = data || {};

    if (!id || !enclosure) return !!dovetail?.id;

    const isProcessing = 'processing' === enclosure.status;

    if (! isProcessing ) {
      dispatch({ type: 'UPDATE_EPISODE_DOVETAIL', payload: { enclosure } });
    }

    return isProcessing;
  }, 2000, [dovetail?.id, dovetail?.enclosure?.status]);

  // useEffect(() => {
  //   if (wp?.data && wp.data.select('core/editor').getEditedPostAttribute('meta')) {
  //     // @ts-expect-error
  //     wp.data.dispatch('core/editor').editPost({
  //       meta: {
  //         _dovetail_podcasts_episode: episode
  //       }
  //     })
  //   }
  // }, [episode])

  return (
    <PostMetaboxContext.Provider value={{ state, options }}>
      <div className='mt-[12px] @container/main relative' {...(isUiLocked && { inert: true })}>
        {isUiLocked && <Skeleton className='absolute -inset-2 z-10 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20' />}
        {!episode?.podcastId ? (
          !initialEpisodeData?.podcastId ? (
            <Button size='lg' variant='outline' className='w-full' type='button' onClick={selectPodcastDialog.show}>
              <DiamondPlusIcon />
              <span>Add To Podcast...</span>
            </Button>
          ) : (
            <>
            <input type='hidden' name={`${field}_DELETE`} value='DELETE' />
            {!initialEpisodeData?.dovetail?.id ? (
              <Alert>
                <EraserIcon className='size-4' />
                <AlertTitle>Podcast Episode Will Be Removed...</AlertTitle>
                <AlertDescription className='max-w-[80ch]'>
                  This podcast episode has not been added to Dovetail yet, so it is safe to remove this data from the post. Data will be removed when post is saved, but you can still choose to keep it.
                  <Separator orientation='horizontal' className='my-2' />
                  <Button variant='secondary' onClick={() => { restoreEpisode() }}><Undo2Icon />Keep Podcast Episode</Button>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant='destructive'>
                <AlertCircleIcon className='size-4' />
                <AlertTitle>Dovetail Episode Will Be Deleted...</AlertTitle>
                <AlertDescription className='max-w-[80ch]'>
                  It's not too late! Dovetail episode will only be deleted when the post is saved. You can still choose to keep the Dovetail episode associated with this post.
                  <Separator orientation='horizontal' className='my-2' />
                  <Button variant='secondary' onClick={() => { restoreEpisode() }}><Undo2Icon />Keep Dovetail Episode</Button>
                </AlertDescription>
              </Alert>
            )}
            </>
          )
        ) : (
          <>
            <input type='hidden' name={field} value={JSON.stringify(episode)} />
            <div className='grid grid-cols-[3rem_1fr_min-content] items-start justify-items-start gap-4 bg-linear-to-r from-slate-100 p-3 rounded'>
              <span className='grid place-items-center size-full'>
                <PodcastThumbnail podcast={podcast} />
              </span>
              <span className='p-0 font-semibold text-balance self-center'>{podcast.title}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <EllipsisVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='left' align='start'>
                    {/* Show option to change podcast until episode has been published and has a Dovetail episode id. */}
                    {!dovetail?.id && (
                      <>
                      <DropdownMenuItem
                        onSelect={selectPodcastDialog.show}
                      >
                        <ReplaceIcon className='text-inherit' />
                        <span>Change Podcast</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem
                      variant='destructive'
                      onSelect={() => {
                        if (dovetail?.id) {
                          alertRestEpisodeDialog.show();
                        } else {
                          resetEpisode();
                        }
                      }}
                    >
                      <TrashIcon className='text-inherit' />
                      <span>Remove Podcast Episode</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Separator className='my-3' />
            <div className='grid @4xl/main:grid-cols-[1fr_17.5rem] items-center gap-4 max-w-full'>
              <Enclosure onChange={handleEnclosureChange} />

              <div className='@container/group-1'>
                <div className='grid @md/group-1:grid-cols-2 gap-3 bg-slate-100 rounded p-4'>
                  <PostMetaboxControl forId='dovetail_podcasts_episode[itunes_type]' label='Episode Type'>
                    <Select
                      name='dovetail_podcasts_episode[itunes_type]'
                      value={dovetail.itunesType}
                      onValueChange={(itunesType: DovetailEpisodeType) => { updateEpisodeDovetail({ itunesType }) }}
                    >
                      <SelectTrigger className='bg-white w-fit'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dovetailEpisodeTypes.map(([value, label]) => (
                          <SelectItem value={value} key={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </PostMetaboxControl>

                  <PostMetaboxControl forId='dovetail_podcasts_episode[explicit]' label='Explicit Content'>
                    <Switch className='self-center'
                      name='dovetail_podcasts_episode[explicit]'
                      value='explicit'
                      checked={null !== dovetail.explicit ? dovetail.explicit : podcast.explicit}
                      onCheckedChange={(explicit) => { updateEpisodeDovetail({ explicit }) }}
                    />
                  </PostMetaboxControl>
                </div>
              </div>

              <Collapsible
                open={additionalFields.visible}
                onOpenChange={additionalFields.toggle}
                className='col-span-full'
              >
                <div className='grid gap-4 bg-slate-100 p-4 rounded'>
                  <CollapsibleTrigger className='flex justify-between items-center gap-2'>
                    <h3 className='my-0 text-base'>Additional Information</h3>
                    <ChevronDownIcon className={cn('transition-transform', { 'rotate-180': additionalFields.visible })} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='grid @4xl/main:grid-cols-[1fr_17.5rem] items-stretch gap-4'>
                    <PostMetaboxControl forId='dovetail_podcasts_episode[clean_title]' label='Clean Title'>
                      <div className='grid gap-2 w-full'>
                        <Input className='w-full bg-white'
                          type='text'
                          id='dovetail_podcasts_episode[clean_title]'
                          placeholder={postTitle ? `Overrides: "${postTitle}"` : ''}
                          value={dovetail.cleanTitle || ''}
                          onChange={(evt) => { updateEpisodeDovetail({ cleanTitle: evt.target.value || null }) }}
                        />
                        <p className='my-0'>Optional title without extraneous information, like season number, episode number, or date.</p>
                      </div>
                    </PostMetaboxControl>
                    <div className='@container/group-2'>
                      <div className='grid @md/group-2:grid-cols-2 gap-4'>
                        <PostMetaboxControl forId='dovetail_podcasts_episode[season_number]' label='Season Number'>
                          <Input className='field-sizing-content w-auto min-w-[2em] bg-white'
                            type='number'
                            id='dovetail_podcasts_episode[season_number]'
                            placeholder='#'
                            value={dovetail.seasonNumber || ''}
                            onChange={(evt) => {
                              updateEpisodeDovetail({
                                seasonNumber: evt.target.value.match(/^\d+$/) ? parseInt(evt.target.value, 10) : null
                              });
                            }}
                          />
                        </PostMetaboxControl>
                        <PostMetaboxControl forId='dovetail_podcasts_episode[episode_number]' label='Episode Number'>
                          <Input className='field-sizing-content w-auto min-w-[2em] bg-white'
                            type='number'
                            id='dovetail_podcasts_episode[episode_number]'
                            placeholder='#'
                            value={dovetail.episodeNumber || ''}
                            onChange={(evt) => {
                              updateEpisodeDovetail({
                                episodeNumber: evt.target.value.match(/^\d+$/) ? parseInt(evt.target.value, 10) : null
                              });
                            }}
                          />
                        </PostMetaboxControl>
                      </div>
                    </div>
                    <div className='col-span-full grid @4xl/main:grid-cols-2 gap-4'>
                      <PostMetaboxControl forId='dovetail_podcasts_episode[author_name]' label='Author Name'>
                        <Input className='w-full bg-white'
                          type='text'
                          id='dovetail_podcasts_episode[author_name]'
                          placeholder={podcast.author?.name ? `Overrides: "${podcast.author.name}"` : ''}
                          value={dovetail.author?.name || ''}
                          onChange={(evt) => {
                            updateEpisodeDovetail({
                              author: {
                                ...dovetail.author,
                                name: evt.target.value || null
                              }
                            });
                          }}
                        />
                        <p className='my-0'>Set episode author name if it is different from the podcast author's.</p>
                      </PostMetaboxControl>
                      <PostMetaboxControl forId='dovetail_podcasts_episode[author_email]' label='Author Email'>
                        <Input className='w-full bg-white'
                          type='email'
                          id='dovetail_podcasts_episode[author_email]'
                          placeholder={podcast.author?.email ? `Overrides: "${podcast.author.email}"` : ''}
                          value={dovetail.author?.email || ''}
                          onChange={(evt) => {
                            updateEpisodeDovetail({
                              author: {
                                ...dovetail.author,
                                email: evt.target.value.trim() || null
                              }
                            });
                          }}
                        />
                        <p className='my-0'>Set episode author email if it is different from the podcast author's.</p>
                      </PostMetaboxControl>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>
          </>
        )}

        <Dialog onOpenChange={selectPodcastDialog.toggle} open={selectPodcastDialog.visible}>
            <PodcastsMenu podcasts={podcasts} onSelect={(podcast) => {
              setEpisodePodcastId(podcast);
              selectPodcastDialog.hide();
            }} />
        </Dialog>

        <AlertDialog open={alertRestEpisodeDialog.visible}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to remove Podcast Episode from this post?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will delete the episode in Dovetail, and can not be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button type='button' variant='outline' onClick={alertRestEpisodeDialog.hide}>Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction className={buttonVariants({ variant: 'destructive' })} asChild>
                <Button type='button' variant='destructive' onClick={() => {
                  resetEpisode();
                  alertRestEpisodeDialog.hide();
                }}>Remove</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PostMetaboxContext.Provider>
  )
}
export default PostMetabox;
