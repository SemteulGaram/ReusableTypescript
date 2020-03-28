/**
 * @module reusable/ManagerRequest
 * Simple, and custom request
 * 
 * @version 1.0
 * @since 2020-03-29
 * @dependency axios
 */

import axios, { AxiosResponse } from 'axios'
import { Readable } from 'stream'

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  LINK = 'link',
  UNLINK = 'unlink'
}

export interface RequestQueue {
  requestAt: number
  url: string
}

export interface IRequestBase {
  url: string
  method?: Method
  maxContentLength?: number
  timeout?: number
  onDownloadProgress?: (event: ProgressEvent) => void
}

export interface IResponseBase {
  status: number
  isOk: boolean
  redirectionUrl: string
}

// requestText
export interface IRequestTextOptions extends IRequestBase {}

export interface ITextResponse extends IResponseBase {
  text: string
}

// requestStream
export interface IRequestOptions extends IRequestBase {}

export interface IResponse extends IResponseBase {
  stream: Readable
}

export class ManagerRequest {
  _queue: RequestQueue[]

  constructor () {
    this._queue = []
  }

  async requestText (options: IRequestTextOptions): Promise<ITextResponse> {
    const res = await axios({
      method: options.method || 'get',
      url: options.url,
      responseType: 'text',
      timeout: options.timeout || 30000,
      maxContentLength: options.maxContentLength || 10 * 1024 * 1024,
      onDownloadProgress: options.onDownloadProgress
    }) as AxiosResponse<string>
    
    return {
      status: res.status,
      isOk: res.status >= 200 && res.status < 300,
      redirectionUrl: '' + res.request.res.responseUrl,
      text: (res.data ? ('' + res.data) : '')
    }
  }

  async requestStream (options: IRequestOptions): Promise<IResponse> {
    const res = await axios({
      method: options.method || 'get',
      url: options.url,
      responseType: 'stream',
      timeout: options.timeout || 30000,
      maxContentLength: options.maxContentLength,
      onDownloadProgress: options.onDownloadProgress
    }) as AxiosResponse<Readable>

    return {
      status: res.status,
      isOk: res.status >= 200 && res.status < 300,
      redirectionUrl: '' + res.request.res.responseUrl,
      stream: res.data
    }
  }
}
