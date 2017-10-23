import * as express from 'express'

import { ENV } from '../server'
import { config } from '../config'

export let HOST = config.serverUrl[ENV]
export let API_HOST = `${HOST}${config.serverSuffixes.api}`
export let AUTH_HOST = `${HOST}${config.serverSuffixes.auth}`

export const fullUrlFromString = (originalUrl: string, host: string = AUTH_HOST) => {
    return `${host}${originalUrl}`
}

export const fullUrlFromReq = (req: express.Request, host: string = AUTH_HOST) => {
    return fullUrlFromString(req.originalUrl, host)
}
