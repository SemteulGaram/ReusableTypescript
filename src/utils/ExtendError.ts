/**
 * @module utils/ExtendError
 * Error with err.code
 * 
 * @version 1.0
 * @since 2020-03-29
 * @class
 */

export class ExtendError extends Error {
  code?: string

  /**
   * 
   * @param {string} msg - Error message
   * @param {string?} code - Error code
   */
  constructor (msg: string, code?: string) {
    super(msg)
    if (code) this.code = code
  }
}
