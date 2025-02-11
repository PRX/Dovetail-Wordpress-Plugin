export type Maybe<T> = T | null;

export type ApiImage = {
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
