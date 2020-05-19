/**
 * @module utils/numberFormat
 * Number formatter
 * 
 * @version 1.0
 * @since 2020-04-30
 */

/**
 * Number format to x,xxx,xxx
 * https://stackoverflow.com/a/3753507/8274779
 * 
 * @param {number} num
 * @param {string} separator - default: ','
 * @return {string}
 */
export function numberWithCommas (num: number, separator: string = '-'): string {
  const numString = '' + num
  const x = numString.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
