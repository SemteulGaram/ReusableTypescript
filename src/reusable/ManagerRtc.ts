/**
 * @module reusable/ManagerRtc
 * Real Time Communication Manager (socket.io)
 * 
 * @version 1.0
 * @since 2020-03-29
 * @dependency socket.io
 * @todo
 */

import SocketIo, { Server } from 'socket.io'

export class ManagerRtc {
  io: Server

  constructor () {
    this.io = SocketIo()
  }

  aggregationHttpCallback () {

  }
}
