/**
 * @module utils/runtime
 * measure script run time
 *
 * @version 1.0
 * @since 2020-05-20
 * @return {() => [number, number]}
 */
export function startMeasure (): () => [number, number] {
  const startAt = process.hrtime()
  return () => {
    const stopAt = process.hrtime()
    return [stopAt[0] - startAt[0], stopAt[1] - startAt[1]]
  }
}
