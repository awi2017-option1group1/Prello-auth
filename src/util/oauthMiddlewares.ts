import * as Oauth2Server from 'oauth2-server'

import { AccessTokenFacade } from '../bl/accessTokenFacade'
import { AuthorizationCodeFacade } from '../bl/authorizationCodeFacade'
import { ClientFacade } from '../bl/clientFacade'

const model = {
    getAuthorizationCode: AuthorizationCodeFacade.getById,
    saveAuthorizationCode: AuthorizationCodeFacade.getOrCreate,
    revokeAuthorizationCode: AuthorizationCodeFacade.delete,

    getAccessToken: AccessTokenFacade.getById,
    saveToken: AccessTokenFacade.create,

    getClient: ClientFacade.getByIdAndSecret,

    verifyScope: () => Promise.resolve(true)
}

const oauth = new Oauth2Server({ model })
const Request = Oauth2Server.Request
const Response = Oauth2Server.Response

export const tokenMiddleware = (req, res, next) => {
    const request = new Request(req)
    const response = new Response(res)

    oauth.token(request, response)
    .then((token) => {
        res.set(response.headers).json(response.body)
    })
    .catch(err => {
        console.log(err)
        res.status(err.status).json({ message: err.message })
    })
}

export const authorizeMiddleware = (req, res, next) => {
    const request = new Request(req)
    const response = new Response(res)

    const options = {
        authenticateHandler: {
            handle: (data) => {
                return req.user
            }
        },
        allowEmptyState: true
    }

    if (req.body.cancel) {
        return res.redirect(req.query.redirect_uri)
    }

    oauth.authorize(request, response, options).then((authorizationCode) => {
        res.status(response.status).set(response.headers).end()
    })
    .catch(err => {
        res.status(err.status).json({ message: err.message })
    })
}
  
export const authenticateMiddleware = (req, res, next) => {
    const request = new Request(req)
    const response = new Response(res)
  
    oauth.authenticate(request, response)
    .then((token) => {
        Object.assign(req, { token })
        next()
    })
    .catch(err => { 
        res.status(err.status).json({ message: err.message })
    })
}
