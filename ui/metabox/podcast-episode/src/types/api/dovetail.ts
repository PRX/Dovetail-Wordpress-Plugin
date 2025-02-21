
export type DovetailImage = {
  href: string,
  originalUrl: string,
  format: string,
  height: number,
  width: number,
  size: number,
  status: string,
  altText?: string,
  caption?: string,
  credit?: string,
}

export const dovetailEpisodeTypes = [
  ['full', 'Full'],
  ['trailer', 'Trailer'],
  ['bonus', 'Bonus']
] as const;
export type DovetailEpisodeType = (typeof dovetailEpisodeTypes)[number][0];

export const dovetailEnclosureStatuses = [
  'processing',
  'error',
  'invalid',
  'complete',
  'incomplete'
] as const;
export type DovetailEnclosureStatus = (typeof dovetailEnclosureStatuses)[number];

export type DovetailMedia = {
  href: string,
  filename?: string,
  type?: string,
  size?: number,
  duration?: number,
  status?: DovetailEnclosureStatus
}

export type DovetailEpisodeEnclosure = {
  href: string,
  type: string,
  size: number,
  duration: number,
  status: DovetailEnclosureStatus
}

export type DovetailAuthor = {
  name?: Maybe<string>,
  email?: Maybe<string>
}

export type DovetailPodcast = {
  id: number,
  title: string,
  itunesImage?: DovetailImage,
  feedImage?: DovetailImage,
  author?: DovetailAuthor
}

export type DovetailEpisode = {
  /**
   * Dovetail id for episode.
   * Use for determining if episode exists in Dovetail and simplify updates.
   * Required, but won't exist until podcast episode is created in Dovetail
   * after podcast episode post is published.
   */
  id: Maybe<string>,

  /**
   * Episode type.
   * Default to 'Full'.
   */
  type: DovetailEpisodeType,

  /**
   * Dovetail hosted enclosure.
   * Use this enclosure for frontend player.
   * Won't exist until podcast episode is created in Dovetail
   * after podcast episode post is published.
   */
  enclosure?: Maybe<DovetailEpisodeEnclosure>,

  /**
   * Media
   */
  media?: DovetailMedia[],

  /**
   * Season number.
   */
  seasonNumber?: Maybe<number>,

  /**
   * Episode number.
   */
  episodeNumber?: Maybe<number>,

  /**
   * Flag episode for explicit content.
   * Default to podcast's explicit setting.
   */
  explicit: boolean,

  /**
   * Title without extraneous information, like season and/or number.
   */
  cleanTitle?: string,

  /**
   * Author information for the episode if it should differ from the podcast default.
   */
  author?: DovetailAuthor,

  /**
   * Array of category names.
   */
  categories?: string[]
}
