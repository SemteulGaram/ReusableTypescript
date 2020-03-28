/**
 * @module utils/isDev
 * Detect NODE_ENV is not production
 * 
 * @version 1.0
 * @since 2020-03-29
 * @function
 * @return {boolean}
 */

export function isDev (): boolean {
  return !(process.env.NODE_ENV?.toLowerCase() === 'production')
}
