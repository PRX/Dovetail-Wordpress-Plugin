import type { ApiImage } from '@/types/api';
import { type PostMetaboxAction, type PostMetaboxState } from '@/types/state/postMetabox';
import { EpisodeData } from '@/types/state/episode';
import React, { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';

export type PodcastOption = {
  id: number,
  title: string,
  itunesImage?: ApiImage,
}

export type PostMetaboxOptions = {
  podcasts: PodcastOption[]
};

export type PostMetaboxProps = {
  episode: EpisodeData,
  options: PostMetaboxOptions
};

const initialAppState = {
} as PostMetaboxState;

function postMetaboxStateReducer(state: PostMetaboxState, action: PostMetaboxAction) {
  const { episode } = state;

  switch (action.type) {

    default:
      return state;
  }
}

function PostMetabox({ episode: initialEpisodeData, options }: PostMetaboxProps) {
  const [state, dispatch] = useReducer(postMetaboxStateReducer, { ...initialAppState, episode: initialEpisodeData });
  const { episode } = state;

  console.dir( options );

  function setEpisodeData(data: EpisodeData) {
    dispatch({ type: 'SET_DATA', payload: data} as PostMetaboxAction<EpisodeData>);
  }

  useEffect(() => {
    (async () => {
      // Init stuff here.
    })()
  }, [])

  return (
    <div className='p-4'>
      <h2 className='text-4xl font-bold mb-6'>Podcast Episode Form</h2>
    </div>
  )
}
export default PostMetabox;
