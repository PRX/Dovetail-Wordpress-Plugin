/**
 * Define global variable types.
 */

export type AppLocalizer = {
  [k: string]: string
};

declare global {
  interface Window {
    appLocalizer: AppLocalizer;
  }
}
