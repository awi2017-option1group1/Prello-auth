import * as express from 'express'

import { fullUrlFromReq, AUTH_HOST } from '../util/url'

import { tokenMiddleware, authorizeMiddleware } from '../util/oauthMiddlewares'

import { AccessTokenFacade } from '../bl/accessTokenFacade'
import { ClientFacade } from '../bl/clientFacade'

export class OauthController {

    static async getAuthorize(req: express.Request, res: express.Response, next: express.NextFunction) {
        const client = await ClientFacade.getById(req.query.client_id)
    
        // Bypass the user confirmation for trusted apps
        if (client) {
            if (client.isTrusted) {
                return authorizeMiddleware(req, res, next)
            } else {
                const token = await AccessTokenFacade.getByClientAndUser(client.id, req.user.id)
                if (token) {
                    return authorizeMiddleware(req, res, next)
                }
            }
        }
    
        return res.render('authorize', {
            user: req.user,
            client,
            redirect_uri: fullUrlFromReq(req, AUTH_HOST)
        })
    }

    static postAuthorize(req: express.Request, res: express.Response, next: express.NextFunction) {
        return authorizeMiddleware(req, res, next)
    }

    static postToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        return tokenMiddleware(req, res, next)
    }

    static getDone(req: express.Request, res: express.Response) {
        return res.render('done', { // views: done
            type: 'authorization_code',
            code: req.query.code,
            state: req.query.state,
            to: req.query.to || '*'
        })
    }

}
