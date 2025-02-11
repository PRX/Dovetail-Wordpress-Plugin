import React from 'react';
import ReactDOM from 'react-dom/client';
import { EpisodeData } from '@/types/state/episode';
import PostMetabox from './PostMetabox';
import '@/styles/global.css';

const { appContainerId, episodeMetaDataJson, postMetaboxOptionsJson } = window?.appLocalizer || {};
const el = appContainerId && document.getElementById(appContainerId);
const episodeData = JSON.parse(episodeMetaDataJson) as EpisodeData;
const postMetaboxOptions = JSON.parse(postMetaboxOptionsJson);

if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <PostMetabox episode={episodeData} options={postMetaboxOptions} />
    </React.StrictMode>
  );
}
