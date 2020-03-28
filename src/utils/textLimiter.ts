/**
 * @module utils/textLimiter
 * Crop overflow text
 * 
 * @version 1.0
 * @since 2020-03-29
 * @function
 * @param {string} text - Target string
 * @param {number} len - Length of maximum string to allow
 * @param {string?} tail - (default: '…')
 * @return {string}
 */

export const textLimiter = (text: string, len: number, tail: string = '…'): string => {
  if (text.length > len) {
    return text.substring(0, len).replace('\n', ' ') + tail
  }
  return text
}
