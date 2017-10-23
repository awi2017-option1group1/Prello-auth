import * as express from 'express'

import { config } from '../config'
import { fullUrlFromReq, fullUrlFromString, AUTH_HOST } from '../util/url'

import { login } from '../util/login'

import { UserFacade } from '../bl/userFacade'

export class LoginController {
    
    static getLogin(req: express.Request, res: express.Response) {
        if (req.cookies[config.loginCookieName]) {
            return LoginController.redirectLogin(req, res)
        }

        let errors: string[] = []
        if (req.query.oauth_error) {
            errors.push(`Error during ${req.query.oauth_error} authentication process`)
        }

        return res.render('login', { // views: login
            redirect_uri: fullUrlFromReq(req, AUTH_HOST),
            email: '',
            errors,
            github_login_url: fullUrlFromString('/github', AUTH_HOST)
        })
    }

    static async postLogin(req: express.Request, res: express.Response) {
        const user = await UserFacade.getByEmailAndPassword(req.body.email, req.body.password)
        if (user) {
            await login(user.uid, res)
            return LoginController.redirectLogin(req, res)
        } else {
            return res.render('login', { // views: login
                redirect_uri: fullUrlFromReq(req, AUTH_HOST),
                email: req.body.email || '',
                errors: ['Invalid credentials'],
                github_login_url: fullUrlFromString('/github', AUTH_HOST)
            })
        }
    }

    static getLogout(req: express.Request, res: express.Response) {
        req.logout()
        res.clearCookie(config.loginCookieName)
        res.redirect('/')
    }

    static redirectLogin(req: express.Request, res: express.Response) {
        if (req.query.redirect) {
            let redirect = `${req.query.redirect}`
            if (!redirect.startsWith('/')) {
                redirect = `/${redirect}`
            }
            if (req.query.client_id && req.query.redirect_uri) {
                return res.redirect(
                    `${redirect}?client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`
                )
            } else {
                return res.redirect(redirect)
            }
        } else {
            return res.redirect(`/${config.loginDefaultRedirect}`)
        }
    }

}
