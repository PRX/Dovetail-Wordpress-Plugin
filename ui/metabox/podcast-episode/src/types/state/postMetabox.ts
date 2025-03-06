/**
 * Define PostMetabox State Types.
 */

import type { Action, ActionWithPayload } from "@/types/state/action";
import type { DovetailEpisode, DovetailPodcast } from "@/types/api";
import type { EpisodeData, EpisodeEnclosure } from "@/types/state/episode";
import type { WP_REST_API_Attachment } from "wp-types";

export const POST_META_BOX_KEY = '_dovetail_podcasts_episode' as const;

export type PostMetaboxOptions = {
  /**
   * List of podcasts from Dovetail API.
   */
  podcasts: DovetailPodcast[],

  /**
   * Array of media attached to the post.
   * Keyed by attached media post id.
   */
  attachedMedia: Map<string,WP_REST_API_Attachment>
};

export type PostMetaboxState = {
  podcast: DovetailPodcast,
  episode: EpisodeData,
};

export type PostMetaboxAction<T = void> = T extends void ? (
  { type: 'SET_TO_DEFAULT' } |
  { type: 'SET_PODCAST_TO_DEFAULT' } |
  { type: 'SET_PODCAST', payload: DovetailPodcast } |
  { type: 'SET_EPISODE', payload: EpisodeData } |
  { type: 'UPDATE_EPISODE', payload: Partial<EpisodeData> } |
  { type: 'SET_EPISODE_ENCLOSURE', payload: EpisodeEnclosure } |
  { type: 'UPDATE_EPISODE_ENCLOSURE', payload: Partial<EpisodeEnclosure> } |
  { type: 'UPDATE_EPISODE_DOVETAIL', payload: Partial<DovetailEpisode> }
) : ActionWithPayload<T>;
