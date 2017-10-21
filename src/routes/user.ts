import * as express from 'express'

import { AccessTokenFacade } from '../bl/accessTokenFacade'

export class UserController {

    static async getTokens(req: express.Request, res: express.Response) {
        const tokens = await AccessTokenFacade.getAllByUser(req.token.user.id)
        return res.json({ tokens })
    }

}
