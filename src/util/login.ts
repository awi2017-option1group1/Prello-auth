import * as express from 'express'

import { config } from '../config'

import { UserFacade } from '../bl/userFacade'

export const login = async (userId: number, res: express.Response) => {
    const token = await UserFacade.authenticate(userId)
    res.cookie(config.loginCookieName, token, { 
        httpOnly: true, 
        sameSite: true, 
        secure: config.env !== 'development' 
    })
}
