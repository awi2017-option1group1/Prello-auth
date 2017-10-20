import * as express from 'express'

import { config } from '../config'
import { ENV } from '../server'

import { UserFacade } from '../bl/userFacade'

export class LoginController {
    
    static getLogin(req: express.Request, res: express.Response) {
        return res.render('login', { // views: login
            redirect_uri: req.originalUrl
        })
    }

    static async postLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await UserFacade.getByEmailAndPassword(req.body.username, req.body.password)
        if (user) {
            // TODO: set an encrypted string ???   
            res.cookie(config.loginCookieName, user.id, { 
                httpOnly: true, 
                sameSite: true, 
                secure: ENV !== 'development' 
            })
            return res.redirect(
                `/${req.query.redirect}?client_id=${req.query.client_id}&redirect_uri=${ req.query.redirect_uri}`
            )
        } else {
            return LoginController.getLogin(req, res)
        }
    }

    static getLogout(req: express.Request, res: express.Response) {
        req.logout()
        res.clearCookie(config.loginCookieName)
        res.redirect('/')
    }

}
