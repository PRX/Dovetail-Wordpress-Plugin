/**
 * Define PostMetabox State Types.
 */

import { EpisodeData } from "@/types/state/episode";

export type PostMetaboxState = {
  episode: EpisodeData,
};

type Action = {
  type: string
}
type ActionWithPayload<T> = Action & {
  payload: T
}
export type PostMetaboxAction<T = void> = T extends void ? Action : ActionWithPayload<T>;
