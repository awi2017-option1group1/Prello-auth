import * as express from 'express'
import * as rq from 'request'

import { InternalOAuth, config } from '../config'

import { fullUrlFromString, AUTH_HOST } from '../util/url'

export class CallbackController {

    static async getZendeskToken(req: express.Request, res: express.Response) {
        try {
            const token = await CallbackController.retrieveAccessToken(req.query.code, config.zendesk)
            return res.status(200).json(token)
        } catch (e) {
            return res.status(400).json({ error: e })
        }
    }

    static async getElectronToken(req: express.Request, res: express.Response) {
        try {
            const token = await CallbackController.retrieveAccessToken(req.query.code, config.electron)
            return res.status(200).json(token)
        } catch (e) {
            return res.status(400).json({ error: e })
        }
    }

    private static retrieveAccessToken(code: string, client: InternalOAuth): Promise<{}> {
        return new Promise((resolve, reject) => {
            rq.post(
                fullUrlFromString(`/oauth/token` , AUTH_HOST), 
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                    body: `client_id=${client.clientId}`
                        + `&client_secret=${client.clientSecret}`
                        + `&grant_type=authorization_code&code=${code}`
                        + `&redirect_uri=${client.redirectUri}`
                },
                (reqErr, response, body) => {
                    if (reqErr) {
                        reject(reqErr)
                    } else {
                        if (response.statusCode === 200) {
                            resolve(JSON.parse(body))
                        } else {
                            reject(JSON.parse(body))
                        }
                    }
                }
            )
        }) 
    }

}
