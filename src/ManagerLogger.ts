/**
 * @module reusable/ManagerLogger/ExampleLogger
 * @see ./reusable/manager-logger.ts
 */

export * from './reusable/ManagerLogger'
import { ILoggerType, IInfoGroup, IInfoElement, BaseLoggerInfo, Level, BaseManagerLogger } from './reusable/ManagerLogger'

export type IExampleLoggerType = 
ILoggerType
| 'progress'
| 'download'
| 'finish'
| 'verboseWarning'
| 'fatal';

export const ExampleLoggerInfo: IInfoGroup<IExampleLoggerType>
= Object.assign({}, BaseLoggerInfo, {
  progress: {
    level: Level.INFO,
    label: 'Progress',
    styles: [ 'magenta' ],
    badge: '…'
  } as IInfoElement,
  download: {
    level: Level.INFO,
    label: 'Download',
    styles: [ 'magenta' ],
    badge: '↓'
  } as IInfoElement,
  finish: {
    level: Level.INFO,
    label: 'Finish',
    styles: [ 'green' ],
    badge: '∴'
  } as IInfoElement,
  verboseWarning: {
    level: Level.VERBOSE,
    label: 'VerboseWarning',
    styles: [ 'yellow' ],
    badge: '!'
  } as IInfoElement,
  fatal: {
    level: Level.ERROR,
    label: 'FATAL',
    styles: [ 'red' ],
    badge: '☢'
  } as IInfoElement
})

export class ExampleLogger extends BaseManagerLogger<IExampleLoggerType> {
  _getStaticInfoGroup () {
    return ExampleLoggerInfo
  }
}

// @overwrite
export const instance = new ExampleLogger()
export const globalLog = instance.createLogger('Global')
