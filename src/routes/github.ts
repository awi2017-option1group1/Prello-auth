import * as express from 'express'
import * as rq from 'request'

import { config } from '../config'

import { GithubService } from '../oauth'
import { setConnectionCookie } from '../cookies'

import { LoginController } from './login'
import { UserFacade } from '../bl/userFacade'

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

    static async getGithubCallback(req: express.Request, res: express.Response) {
        res.redirect(GithubService.getAuthorizeUrl({
            redirect_uri: config.github.callbackURL,
            scope: 'user:email'
        }))
    }

    static async getGithubLoginCallback(req: express.Request, res: express.Response) {
        const code = req.query.code
        GithubService.getOAuthAccessToken(code, {}, async (tokenErr, accessToken, refreshToken) => {
            if (tokenErr || !accessToken) {
                res.redirect('../login?oauth_error=Github')
            }

            try {
                const [ profile, emails ] = await Promise.all([
                    GithubController.getUserProfile(accessToken), 
                    GithubController.getUserEmails(accessToken)
                ])
                const primaryEmail = emails[0].email

                const user = await UserFacade.getByEmail(primaryEmail)

                if (!user) {
                    // TODO: create it
                    console.log(profile)
                }

                setConnectionCookie(
                    {
                        id: user!.uid,
                        email: primaryEmail
                    }, 
                    res
                )
                return LoginController.redirectLogin(req, res)
            } catch (e) {
                res.redirect('../login?oauth_error=Github')
            }
            res.end()
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
