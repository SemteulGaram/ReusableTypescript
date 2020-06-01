/**
 * @module utils/uuidUnsafe
 * UUID tool with simple Math.random
 *
 * @version 1.0
 * @since 2020-06-01
 */

function _unsafeGenerator (): string {
  return (Math.floor(Math.random()*0xFFFF)).toString(16).padStart(4, '0')
}

/**
 * Simple Short UUID v4 generator
 *
 * @return {string}
 */
export function unsafeShortUuidV4(): string {
  return `${ _unsafeGenerator() }${ _unsafeGenerator() }`
}

/**
 * Simple Full UUID v4 generator
 *
 * @return {string}
 */
export function unsafeUuidV4(): string {
  return `${ _unsafeGenerator() }${ _unsafeGenerator() }-${
    _unsafeGenerator() }-${ _unsafeGenerator() }-${
    _unsafeGenerator() }-${ _unsafeGenerator() }${
    _unsafeGenerator() }${ _unsafeGenerator() }`
}
