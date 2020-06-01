/**
 * @module utils/uuid
 * UUID tool
 *
 * @version 1.1
 * @since 2020-05-28
 * @dependency crypto
 */
import crypto from 'crypto'

function _cryptoModuleGenerator (): string {
  return crypto.randomBytes(2).toString('hex').padStart(4, '0')
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
