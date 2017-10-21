import * as express from 'express'

import { config } from './config'
import { ENV } from './server'

interface UserData {
    id: number,
    email: string
}

export const setConnectionCookie = (user: UserData, res: express.Response) => {
    res.cookie(config.loginCookieName, user.id, { 
        httpOnly: true, 
        sameSite: true, 
        secure: ENV !== 'development' 
    })
}
