import * as express from 'express'

import { AccessTokenFacade } from '../bl/accessTokenFacade'
import { UserFacade } from '../bl/userFacade'

export class UserController {

    static async getTokens(req: express.Request, res: express.Response) {
        const tokens = await AccessTokenFacade.getAllByUser(req.token.user.id)
        return res.json({ tokens })
    }

    static async getTokenData(req: express.Request, res: express.Response) {
        switch (req.params.type) {
            case 'header':
                const accessToken = await AccessTokenFacade.getById(req.params.token)
                if (accessToken) {
                    res.status(200).send({ user: { uid: accessToken.user.uid } })
                }
                res.status(404).json({ error: 'Invalid token' })
                break

            case 'cookie':
                const user = await UserFacade.getByToken(req.params.token)
                if (user) {
                    res.status(200).send({ user: { uid: user.uid } })
                }
                res.status(404).json({ error: 'Invalid token' })
                break

            default:
                res.status(400).json({ error: 'Invalid token type' })
                break
        }
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
