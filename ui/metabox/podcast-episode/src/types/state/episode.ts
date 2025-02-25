/**
 * Episode definitions.
 */

import type { DovetailEpisode } from "@/types/api/dovetail";

export type EpisodeEnclosure = {
  /**
   * Wordpress media id.
   * Use to look up media post for source URL and media details.
   */
  mediaId?: number,

  /**
   * URL of audio file.
   * When `mediaId` is set, should be the public URL to the uploaded audio file.
   * Otherwise, should be the URL to third-party hosting (S3, Google Cloud, etc.).
   */
  url: string,

  /**
   * Filename of the file URL.
   * Storing this separately so a filename can be shown consistently after publishing to
   * Dovetail. The `mediaId` and `url` can be removed after publishing, and audio playback
   * will come from Dovetail audio URL's, in which the filename portion of the URL is decorative.
   * Always set this when `url` is added or changed, but not when it is removed.
   */
  filename: string,

  /**
   * Date the URL was last updated.
   * Use to determine if Dovetail enclosure URL needs to be updated.
   * Set on Wordpress enclosure when new audio file is uploaded.
   * Set on Dovetail enclosure when update is sent to Dovetail.
   */
  dateUpdated: Date
}

export type EpisodeData = {
  enclosure: Maybe<EpisodeEnclosure>,

  /**
   * Dovetail id of podcast.
   * Use to look up podcast details.
   */
  podcastId: Maybe<number>,

  /**
   * Dovetail episode data.
   */
  dovetail: DovetailEpisode
};
