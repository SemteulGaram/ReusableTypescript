/**
 * @module utils/matchAll
 * Return all Regex-match group
 * 
 * @version 1.0
 * @since 2020-03-29
 * @author HelloWorld017
 * @function
 * @param {string} input
 * @param {RegExp} regex
 * @return {string[][]}
 */

export function matchAll (input: string, regex: RegExp): string[][] {
  const output: string[][] = [];
  let matches = null;
  if (regex.flags.indexOf('g') === -1) {
    regex = new RegExp(regex, regex.flags + 'g')
  }
  while ((matches = regex.exec(input))) {
    output.push(matches);
  }

  return output;
}
