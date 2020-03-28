/**
 * @module reusable/ManagerSql
 * SQL Object Modeling Tool and Handle
 * 
 * @version 1.0
 * @since 2020-03-29
 * @dependency knex
 * @todo
 */

import Knex from 'knex'

export class ManagerSql {
  _knex: Knex

  constructor () {
    this._knex = Knex({
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      }
    })
  }
}
