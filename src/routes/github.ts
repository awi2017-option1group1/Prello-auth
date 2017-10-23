import * as express from 'express'
import * as rq from 'request'

import { config } from '../config'

import { GithubService } from '../util/oauth'
import { login } from '../util/login'
import { fullUrlFromString, API_HOST, AUTH_HOST } from '../util/url'

import { LoginController } from './login'
import { UserFacade } from '../bl/userFacade'
import { OAuth2User } from '../entities/User'

interface GithubProfile {
    login: string
    avatar_url: string
    id: number,
    name: string
}

interface GithubEmail {
    email: string
}

export class GithubController {

    static async getGithubLogin(req: express.Request, res: express.Response) {
        res.redirect(GithubService.getAuthorizeUrl({
            redirect_uri: config.github.callbackURL,
            scope: 'user:email'
        }))
    }

    static async getGithubLoginCallback(req: express.Request, res: express.Response) {
        const code = req.query.code
        GithubService.getOAuthAccessToken(code, {}, async (tokenErr, accessToken, refreshToken) => {
            if (tokenErr || !accessToken) {
                res.redirect(fullUrlFromString('/login?oauth_error=Github', AUTH_HOST))
            }

            try {
                const [ profile, emails ] = await Promise.all([
                    GithubController.getUserProfile(accessToken), 
                    GithubController.getUserEmails(accessToken)
                ])
                const primaryEmail = emails[0].email

                let user = await UserFacade.getByEmail(primaryEmail)

                if (!user) {
                    user = await GithubController.createUser(primaryEmail, profile.login)
                }

                await login(user!.uid, res)
                return LoginController.redirectLogin(req, res)
            } catch (e) {
                console.log(e)
                res.redirect(fullUrlFromString('/login?oauth_error=Github', AUTH_HOST))
            }
            res.end()
        })
    }

    private static createUser(email: string, username: string): Promise<OAuth2User> {
        return new Promise((resolve, reject) => {
            rq.post(
                fullUrlFromString('/register', API_HOST), 
                {
                    body: {
                        email,
                        username
                    }
                },
                (reqErr, response, body) => {
                    if (reqErr) {
                        reject(reqErr)
                    } else {
                        const userData = JSON.parse(body)
                        userData.uid = userData.id
                        resolve(userData)
                    }
                }
            )
        }) 
    }

    private static getUserProfile(accessToken: string): Promise<GithubProfile> {
        return new Promise((resolve, reject) => {
            rq.get(
                'https://api.github.com/user', 
                {
                    auth: {
                        bearer: accessToken
                    },
                    headers: {
                        'User-Agent': config.github.userAgent
                    } 
                },
                (reqErr, response, body) => {
                    if (reqErr) {
                        reject(reqErr)
                    } else {
                        resolve(JSON.parse(body))
                    }
                }
            )
        }) 
    }

    private static getUserEmails(accessToken: string): Promise<GithubEmail[]> {
        return new Promise((resolve, reject) => {
            rq.get(
                'https://api.github.com/user/emails', 
                {
                    auth: {
                        bearer: accessToken
                    },
                    headers: {
                        'User-Agent': config.github.userAgent
                    } 
                },
                (reqErr, response, body) => {
                    if (reqErr) {
                        reject(reqErr)
                    } else {
                        resolve(JSON.parse(body))
                    }
                }
            )
        }) 
    }

}
