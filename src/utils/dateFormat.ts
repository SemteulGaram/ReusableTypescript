/**
 * @module utils/DateFormat
 * Error with err.code
 * 
 * @version 1.0
 * @since 2020-04-04
 */

/**
 * Date format to YYYY-MM-DD
 * 
 * @param {Date} date
 * @return {string}
 */
export function dateYYYY_MM_DD (date: Date): string {
  return `${
    date.getFullYear().toString().padStart(4, '0')
  }-${
    (date.getMonth()+1).toString().padStart(2, '0')
  }-${
    date.getDate().toString().padStart(2, '0')
  }`
}

/**
 * Date format to MM-DD
 * 
 * @param {Date} date
 * @return {string}
 */
export function dateMM_DD (date: Date): string {
  return `${
    (date.getMonth()+1).toString().padStart(2, '0')
  }-${
    date.getDate().toString().padStart(2, '0')
  }`
}

/**
 * Date format to Y년 M월 D일
 * 
 * @param {Date} date
 * @return {string}
 */
export function dateKR_YMD (date: Date): string {
  return `${ date.getFullYear() }년 ${ (date.getMonth()+1) }월 ${ date.getDate() }일`
}

/**
 * Date format to M월 D일
 * 
 * @param {Date} date
 * @return {string}
 */
export function dateKR_MD (date: Date): string {
  return `${ (date.getMonth()+1) }월 ${ date.getDate() }일`
}
