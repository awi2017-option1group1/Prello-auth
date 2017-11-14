import * as passport from 'passport'

import { config } from '../config'
import { fullUrlFromString, AUTH_HOST } from './url'

import { UserFacade } from '../bl/userFacade'

const CookieStrategy = require('passport-cookie').Strategy
passport.use(new CookieStrategy({ cookieName: config.loginCookieName }, (token, done) => {
    UserFacade.getByToken(token).then(
        user => done(null, user),
        error => done(error)
    )
}))

export default passport

interface EnsureLoginOptions {
    redirect?: boolean
}

const redirectToLogin = (req, res) => {
    return res
        .cookie(config.redirectCookieName, `/${config.server.authSuffix}${req.url}`, {
            httpOnly: true, 
            sameSite: true, 
            secure: config.env !== 'development',
            maxAge: 300000
        })
        .redirect(fullUrlFromString(`/login`, AUTH_HOST))
}

export const ensureLogin = (options?: EnsureLoginOptions) => (req, res, next) => {
    passport.authenticate('cookie', { session: false }, (authErr, user, infos) => {
        if (authErr || !user) {
            if (options && options.redirect) {
                redirectToLogin(req, res)
            } else {
                res.status(401).json({ error: 'Unauthorized' })
            }
        } else {
            req.user = user
            next()
        }
    })(req, res, next)
}
