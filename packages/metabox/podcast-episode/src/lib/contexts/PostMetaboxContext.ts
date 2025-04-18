/**
 * Define App Context.
 */

import type { PostMetaboxOptions, PostMetaboxState } from "@/types/state/postMetabox";
import { createContext } from "react";


export type PostMetaboxContextValue = {
  state: PostMetaboxState,
  options: PostMetaboxOptions,
}

export const PostMetaboxContext = createContext<PostMetaboxContextValue>(null);
