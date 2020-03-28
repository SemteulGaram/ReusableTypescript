/**
 * @module utils/stringifyError
 * Detect NODE_ENV is not production
 * 
 * @version 1.0
 * @since 2020-03-29
 */

/**
 * Ensure stringify Error object
 * 
 * @param {any} err - Any Error object
 * @return {string}
 */
export function stringifyErrorMsg(err: any): string {
  if (!err) return 'Undefined error.'
  if (!err.message) return 'Unknown error ->' + err
  return '' + err.message
}

/**
 * Ensure convert Error object to stack string
 * 
 * @param {any} err - Any Error object
 * @return {string}
 */
export function stringifyErrorStack(err: any): string {
  if (!err) return 'Undefined error.'
  if (!err.stack) return 'Unknown error -> ' + err
  return '' + err.stack
}
