/**
 * @module reusable/ManagerConfig
 * Integrated config management
 * 
 * @version 1.0
 * @since 2020-03-29
 * @dependency deepmerge
 * @dependency json-beautify
 * @todo
 */

import fs from 'fs';

import deepmerge from 'deepmerge'
import jsonBeautify from 'json-beautify';

import { instance as manacronLogger } from '../ManagerLogger';
import { ExtendError } from '../utils/ExtendError'

const logger = manacronLogger.createLogger('Config');

export interface ISchema {
  example: string;
};

export const DEFAULT_CONFIG: ISchema = {
  example: 'THIS IS EXAMPLE CONFIG'
};

export class ManagerConfig {
  path: string;
  private _config: ISchema|null;

  constructor (path: string) {
    this.path = path;
    this._config = null
  }

  get isReady(): boolean {
    return !!this._config;
  }

  get config(): ISchema {
    if (!this._config) throw new ExtendError('{ManagerConfig}.init() before use config', 'ERR_NOT_INIT');
    return this._config;
  }

  async init(): Promise<ManagerConfig> {
    try {
      await this.reload();
      await this.save();
    } catch (err) {

      if (err.code === 'ENOENT') {
        logger.debug('Config not found. Create one...');
        await this._createConfig();
        await this.reload();
        await this.save();
      } else {
        throw err;
      }
    }

    return this;
  }

  async reload() {
    this._config = deepmerge(
      DEFAULT_CONFIG,
      JSON.parse(await fs.promises.readFile(this.path, 'utf-8')),
      {
        // Overwrite array
        arrayMerge: (d, s, o) => s
      }
    );
  }

  async save() {
    return await fs.promises.writeFile(
      this.path,
      //@ts-ignore
      jsonBeautify(this.config, null, 2, 80),
      'utf-8'
    );
  }

  private async _createConfig() {
    return await fs.promises.writeFile(
      this.path,
      //@ts-ignore
      jsonBeautify(DEFAULT_CONFIG, null, 2, 80),
      'utf-8'
    );
  }
}
