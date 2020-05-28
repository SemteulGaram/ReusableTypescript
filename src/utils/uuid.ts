/**
 * @module utils/uuid
 * UUID tool
 *
 * @version 1.0
 * @since 2020-05-28
 */
import crypto from 'crypto'

function _unsafeGenerator (): string {
  return (Math.floor(Math.random()*0xFFFF)).toString(16).padStart(4, '0')
}

function _cryptoModuleGenerator (): string {
  return crypto.randomBytes(2).toString('hex').padStart(4, '0')
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

/**
 * crypto module Short UUID v4 generator
 *
 * @return {string}
 */
export function shortUuidV4(): string {
  return `${ _cryptoModuleGenerator() }${ _cryptoModuleGenerator() }`
}

/**
 * crypto module Full UUID v4 generator
 *
 * @return {string}
 */
export function uuidV4(): string {
  return `${ _cryptoModuleGenerator() }${ _cryptoModuleGenerator() }-${
    _cryptoModuleGenerator() }-${ _cryptoModuleGenerator() }-${
    _cryptoModuleGenerator() }-${ _cryptoModuleGenerator() }${
    _cryptoModuleGenerator() }${ _cryptoModuleGenerator() }`
}
