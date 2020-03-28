/**
 * @module utils/sleep
 * async/await style sleep util
 * 
 * @version 1.0
 * @since 2020-03-29
 * @author HelloWorld017
 * @function
 * @async
 * @param {number} ms - Sleep milliseconds
 * @return {Promise<void>}
 */

export const sleep = async (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(() => resolve(), ms));
