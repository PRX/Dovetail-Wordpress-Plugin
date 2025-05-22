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
  originalUrl?: string,
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

export type DovetailPodcast = {
  /**
   * Dovetail for the podcast.
   */
  id: number,

  /**
   * Title of the podcast.
   */
  title: string,

  /**
   * Flag that podcast content is expected to contain explicit content.
   */
  explicit: boolean,

  /**
   * Image used for iTunes.
   * Usually fairly large, 3000x3000 px.
   */
  itunesImage?: DovetailImage,

  /**
   * Image for RSS feed image.
   * Size and dimensions not guaranteed to be very large.
   */
  feedImage?: DovetailImage,

  /**
   * Info of the usual author of podcast episodes.
   */
  author?: DovetailAuthor

  /**
   * Template for enclosure URL's.
   * Use to construct preview URL in admin players that
   * do not use any URL prefixes.
   */
  enclosureTemplate: string;
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
   * Dovetail hosted enclosure.
   * Use this enclosure for frontend player.
   * Won't exist until podcast episode is created in Dovetail
   * after podcast episode post is published.
   */
  enclosure?: Maybe<DovetailEpisodeEnclosure>,

  /**
   * Episode media for single file format.
   * Episodes created by the plugin should use this property to provide
   * href for original audio file URL.
   * Metabox should use this prop to get original audio URL when not available
   * in Wordpress media library post (if deleted after publish.)
   */
  uncut?: DovetailMedia,

  /**
   * Episode processed media.
   * Should only be set by the frontend when audio is added or updated, and
   * uncut was not set from Dovetail.
   * Do not initialize post meta box episode data with this prop.
   */
  media?: DovetailMedia[],

  /**
   * Episode type.
   * Default to 'Full'.
   */
  itunesType: DovetailEpisodeType,

  /**
   * Podcast's explicit content setting.
   * Not writable in API.
   * Should NOT be modified.
   */
  explicitContent: boolean;

  /**
   * Flag episode for explicit content.
   */
  explicit?: Maybe<boolean>,

  /**
   * Season number.
   */
  seasonNumber?: Maybe<number>,

  /**
   * Episode number.
   */
  episodeNumber?: Maybe<number>,

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
