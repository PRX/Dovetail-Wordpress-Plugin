/**
 * Define global variable types.
 */

export type AppLocalizer = {
  appContainerId: string,
  postId: number,
  postStatus: string,
  postTitle: string,
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
