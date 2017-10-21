import * as express from 'express'

import { config } from './config'
import { ENV } from './server'

import { UserFacade } from './bl/userFacade'

interface UserData {
    id: number,
    email: string
}

export const login = async (user: UserData, res: express.Response) => {
    const token = await UserFacade.authenticate(user.id)

    res.cookie(config.loginCookieName, token, { 
        httpOnly: true, 
        sameSite: true, 
        secure: ENV !== 'development' 
    })
}
