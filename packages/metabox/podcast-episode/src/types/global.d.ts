/**
 * Define global variable types.
 */

export type AppLocalizer = {
  appContainerId: string,
  postId: number,
  postType: string,
  postStatus: string,
  postTitle: string,
  restGetRoute: string,
  episodeMetaDataKey: string,
  episodeMetaDataField: string,
  episodeMetaDataJson: string,
  postMetaboxOptionsJson: string,
  audioFormats: string[],
  nonce: string
};

declare global {
  interface Window {
    appLocalizer: AppLocalizer;
  }

  const wp: {
    data: typeof import('@wordpress/data');
  };
}
