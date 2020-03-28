/**
 * @module reusable/ManagerLang
 * I18n support
 * 
 * @version 1.0
 * @since 2020-03-29
 */

import fs from 'fs'
import path from 'path'

import { instance as managerLogger, ILogger, ILoggerType } from '../ManagerLogger'
import { matchAll } from '../utils/matchAll'

// {CWD}/lang/[lang]/[set].js
export type ILangSet = {
  [key in string]: string
}

export type ILang = {
  [key in string]: ILangSet
}

export type ILangGroup = {
  [key in string]: ILang
}

export class ManagerLang {
  private _cache: ILangGroup

  logger: ILogger<ILoggerType>

  constructor () {
    this._cache = {}
    this.logger = managerLogger.createLogger('ManagerLang')
  }

  async getLangSet (lang: string, set: string): Promise<ILangSet|null> {
    if (!this._cache[lang]) {
      if (fs.existsSync(this._getLangPath(lang))) {
        this._cache[lang] = {}
      } else {
        this.logger.e(`Invalid lang requested (${ lang })`)
        return null
      }
    }

    if (!this._cache[lang][set]) {
      try {
        // Typescript ruin with import(expression)
        const langPath = this._getLangPath(lang, set)
        this._cache[lang][set] = await import(langPath)
      } catch (err) {
        this.logger.e(`Invalid langSet requested (lang: ${ lang }, set: ${ set })\n`, err)
        return null
      }
    }
  
    return this._cache[lang][set] || null
  }

  applyLang (langSet: any, key: string|string[]): string {
    if (Array.isArray(key)) {
      let str = langSet[key[0]]
      if (str === undefined) return '' + key[0]
      else str += ''
      key.forEach((v: string, i: number) => {
        if (i === 0) return
        const matched = matchAll(str as string, new RegExp(`\\{${i - 1}\\}`))
        for (const match of matched) {
          const _match: string = '' + match[0]
          let has: boolean = false
          while(str.indexOf(_match) !== -1) {
            has = true
            str = str.replace(_match, v)
          }
          if (!has) {
            str += ' ' + v
          }
        }
        // TODO: WARNING: possible concurrency error
      })
      return str
    } else {
      return (langSet[key] === undefined)
        ? ('' + key)
        : ('' + langSet[key])
    }
  }

  async getLang (lang: string, set: string, key: string): Promise<string|null> {
    const langSet = await this.getLangSet(lang, set)
    return langSet ? (('' + langSet[key]) || null) : null
  }

  private _getLangPath (lang: string, set?: string): string {
    return path.join(process.cwd(), 'lang', lang, set ? (set + '.js') : '.')
  }
}
