/**
 * Base dispatch action.
 */
export type Action<T = any> = {
  type: string,
  payload?: T
}

/**
 * Base dispatch action with payload.
 */
export type ActionWithPayload<T = any> = Action & {
  payload: T
}
