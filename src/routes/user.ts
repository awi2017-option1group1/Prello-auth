import * as express from 'express'

import { AccessTokenFacade } from '../bl/accessTokenFacade'

export class UserController {

    static async getTokens(req: express.Request, res: express.Response) {
        const tokens = await AccessTokenFacade.getAllByUser(req.token.user.id)
        return res.json({ tokens })
    }

    static async getMe(req: express.Request, res: express.Response) {
        return res.json({ 
            me: {
                username: req.user.username,
                email: req.user.email,
                uid: req.user.uid
            } 
        })
    }

}
