import * as express from 'express'

import { config } from '../config'

export const HOST = config.server.host
export const API_HOST = `${HOST}/${config.server.apiSuffix}`
export const AUTH_HOST = `${HOST}/${config.server.authSuffix}`

export const fullUrlFromString = (originalUrl: string, host: string) => {
    return `${host}${originalUrl}`
}

export const fullUrlFromReq = (req: express.Request, host: string) => {
    return fullUrlFromString(req.originalUrl, host)
}
