import * as passport from 'passport'

import { config } from './config'

import { UserFacade } from './bl/userFacade'

const CookieStrategy = require('passport-cookie').Strategy
passport.use(new CookieStrategy({ cookieName: config.loginCookieName }, (token, done) => {
    UserFacade.getById(token).then(
        user => done(null, user),
        error => done(error)
    )
}))

export default passport

export const ensureLogin = () => (req, res, next) => {
    passport.authenticate('cookie', { session: false }, (authErr, user, infos) => {
        if (authErr || !user) {
            let query = ''
            if (req.query.client_id && req.query.redirect_uri && req.query.response_type && req.query.state) {
                query = `&client_id=${req.query.client_id}
                &redirect_uri=${req.query.redirect_uri}
                &response_type=${req.query.response_type}
                &state=${req.query.state}`               
            }
            return res.redirect(
                `/login?redirect=${req.path}${query}`
            )
        } else {
            req.user = user
            next()
        }
    })(req, res, next)
}
