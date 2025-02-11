
export const AbortControllerHashKeys = ['episodes', 'segments'] as const;
export type AbortControllerHashKey = (typeof AbortControllerHashKeys)[number];
export type AbortControllerHash = {
  [k in AbortControllerHashKey]: AbortController;
};
