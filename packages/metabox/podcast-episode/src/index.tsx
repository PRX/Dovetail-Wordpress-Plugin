import type { PostMetaboxOptions } from '@/types/state/postMetabox';
import type { EpisodeData } from '@/types/state/episode';
import React from 'react';
import ReactDOM from 'react-dom/client';
import PostMetabox from './PostMetabox';
import '@/styles/global.css';

const { appContainerId, episodeMetaDataField, episodeMetaDataJson, postMetaboxOptionsJson } = window?.appLocalizer || {};
const el = appContainerId && document.getElementById(appContainerId);
const episodeData = JSON.parse(episodeMetaDataJson) as EpisodeData;
const postMetaboxOptions = JSON.parse(postMetaboxOptionsJson) as PostMetaboxOptions;
const { attachedMedia } = postMetaboxOptions || {};
let episode = episodeData;
const portalDivs = ['dtpc-dialogs', 'dtpc-dropdowns', 'dtpc-tooltips'];

portalDivs.forEach((divId) => {
  let portalDiv = document.getElementById(divId);

  if (!portalDiv) {
    portalDiv = document.createElement('div');

    portalDiv.id = divId;
    portalDiv.classList.add('dtpc-tw');

    document.querySelector('body').appendChild(portalDiv);
  }
})

if (typeof attachedMedia === 'object' && attachedMedia !== null ) {
  postMetaboxOptions.attachedMedia = new Map(Object.entries(attachedMedia));
} else {
  postMetaboxOptions.attachedMedia = new Map();
}

if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <PostMetabox field={episodeMetaDataField} episode={episode} options={postMetaboxOptions} />
    </React.StrictMode>
  );
}
