/**
 * @module reusable/ManagerLogger
 * BaseClass of logger. You can extend with custom logging options.
 * @see ../ManagerLogger.ts
 * 
 * @version 1.0
 * @since 2020-03-29
 * @dependency chalk
 */


import util from 'util'

import chalk, { Color as chalkColor, Modifiers as chalkModifiers, Chalk } from 'chalk'

export enum Level {
  VERBOSE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  NOLOG = 5
}

export interface IInfoElement {
  level: Level
  label: string
  styles: (typeof chalkColor | typeof chalkModifiers)[]
  badge?: string
}

export type IInfoGroup<T extends string> = {
  [key in T]: IInfoElement
}

export interface ITimeLogger {
  time: (key: string, ...args: any) => void
  timeEnd: (key: string, ...args: any) => number
}

export type IBasicLogger<T extends string> = {
  [key in T]: (...args: any[]) => void;
}

export type ILogger<T extends string> = 
  IBasicLogger<T>
& ITimeLogger;

// Abstract class
export abstract class BaseManagerLogger<T extends string> {
  _LoggerInfo: Readonly<IInfoGroup<T>>

  consoleLogLevel: Level

  constructor () {
    this._LoggerInfo = this._getStaticInfoGroup()
    this.consoleLogLevel = Level.INFO
  }

  // Override
  _getStaticInfoGroup (): IInfoGroup<T> {
    throw new Error('Implement this methods.')
  }

  _buildTimeString(date: Date = new Date()): string {
    return date.getHours().toString().padStart(2, '0') + ':'
      + date.getMinutes().toString().padStart(2, '0') + ':'
      + date.getSeconds().toString().padStart(2, '0') + '.'
      + date.getMilliseconds().toString().padStart(4, '0')
  }

  _base (type: T, tag: string, args: any[]): void {
    const info = this._LoggerInfo[type]
    let colorFunction: Chalk = chalk
    for (let style of info.styles) {
      colorFunction = chalk[style as (typeof chalkColor | typeof chalkModifiers)]
    }

    // TODO: log file
    if (info.level >= this.consoleLogLevel) {
      console.log(chalk.cyan(this._buildTimeString() + '>')
        + chalk.green(tag + '>') + colorFunction(
          (info.badge ? info.badge + ' ' : '') + info.label + '> '
          + args.map(v => {
            return (typeof v === 'object' && v !== null) ? util.inspect(v) : v
          }).join(' ')
        )
      )
    }
  }

  createLogger (tag: string): ILogger<T> {
    const timeLogger = new Map<string,number>()
    const logger: any = {
      time: (key: string, ...args: any[]) => {
        timeLogger.set(key, Date.now())

        console.log(chalk.cyan(this._buildTimeString() + '>')
        + chalk.green(tag + '>') + chalk.greenBright('▶ Timer(' + key + ')> ')
        + args.map(v => {
          return (typeof v === 'object' && v !== null) ? util.inspect(v) : v
        }).join(' '))
      },
      timeEnd: (key: string, ...args: any[]) => {
        let timeString: string
        let time = timeLogger.get(key)
        if (time !== undefined) { 
          time = Date.now() - time
          timeLogger.delete(key)
          if (time >= 1000*60) {
            timeString = (time/(1000*60)).toFixed(2) + 'm'
          } else if (time >= 1000) {
            timeString = (time/1000).toFixed(2) + 's'
          } else {
            timeString = (time) + 'ms'
          }
        } else {
          timeString = '(Timer not found)'
        }

        console.log(chalk.cyan(this._buildTimeString() + '>')
        + chalk.green(tag + '>') + chalk.redBright('■ Timer(' + key + ')> ')
        + args.map(v => {
          return (typeof v === 'object' && v !== null) ? util.inspect(v) : v
        }).join(' ')
        + chalk.blueBright(' ' + timeString))

      }
    } as ITimeLogger

    ;(Object.keys(this._LoggerInfo) as T[])
      .forEach((v: T) => {
        logger[v] = (...args: any[]) => { this._base(v, tag, args) }
      }
    )

    return logger
  }
}

// === Base type start
export type ILoggerType = 
  'verbose' | 'v'
| 'debug' | 'd'
| 'info' | 'i'
| 'warn' | 'w'
| 'error' | 'e';

export const BaseLoggerInfo: IInfoGroup<ILoggerType> = {
  verbose: {
    level: Level.VERBOSE,
    label: 'VERBOSE',
    styles: [ 'italic', 'gray' ],
  },
  debug: {
    level: Level.DEBUG,
    label: 'DEBUG',
    styles: [ 'gray' ],
    badge: '-'
  },
  info: {
    level: Level.INFO,
    label: 'INFO',
    styles: [ 'white' ],
    badge: '*'
  },
  warn: {
    level: Level.WARN,
    label: 'WARN',
    styles: [ 'yellow' ],
    badge: '!'
  },
  error: {
    level: Level.ERROR,
    label: 'ERROR',
    styles: [ 'red' ],
    badge: '×'
  },
  v: {
    level: Level.VERBOSE,
    label: 'VERBOSE',
    styles: [ 'italic', 'gray' ],
  },
  d: {
    level: Level.DEBUG,
    label: 'DEBUG',
    styles: [ 'gray' ],
    badge: '-'
  },
  i: {
    level: Level.INFO,
    label: 'INFO',
    styles: [ 'white' ],
    badge: '*'
  },
  w: {
    level: Level.WARN,
    label: 'WARN',
    styles: [ 'yellow' ],
    badge: '!'
  },
  e: {
    level: Level.ERROR,
    label: 'ERROR',
    styles: [ 'red' ],
    badge: '×'
  }
}

export class ManagerLogger extends BaseManagerLogger<ILoggerType> {
  _getStaticInfoGroup () {
    return BaseLoggerInfo
  }
}
// === Base type end

export const instance = new ManagerLogger()
export const globalLog = instance.createLogger('Global')
