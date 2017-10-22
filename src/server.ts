import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { createConnection } from 'typeorm'
import  { connectionOptions } from './connectionParams'

import { authenticateMiddleware } from './oauthMiddlewares'

import { CallbackController } from './routes/callback'
import { GithubController } from './routes/github'
import { LoginController } from './routes/login'
import { OauthController } from './routes/oauth'
import { UserController } from './routes/user'

import passport, { ensureLogin } from './passport'

export const ENV = process.env.NODE_ENV || 'development'
export const HOSTS = {
    'development': 'http://localhost/auth',
    'production': 'https://photon.igpolytech.fr/auth' 
}
export let HOST = HOSTS[ENV]

export const fullUrl = (req: express.Request) => {
    return `${HOST}${req.originalUrl}`
}

// Set up Express and Oauth2-Node
const app = express()
app.set('port', process.env.PORT || 8000) 
app.engine('ejs', require('ejs-locals'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

// Define routes
app.get('/', (req, res) => {  
    res.json({
        status: 'My API is alive!'
    })
})

app.get('/login', LoginController.getLogin)
app.post('/login', LoginController.postLogin)
app.get('/logout', LoginController.getLogout)

app.get('/github', GithubController.getGithubLogin)
app.get('/github/callback', GithubController.getGithubLoginCallback)

app.get('/tokens', authenticateMiddleware, UserController.getTokens)
// app.get('/tokens', authenticateMiddleware, UserController.getTokens) get data about the requester
// app.delete('/users/tokens/:clientId', LoginController.getLogin) revoke the token

app.get('/token/zendesk', CallbackController.getZendeskToken)
app.get('/token/electron', CallbackController.getElectronToken)

app.get('/oauth/authorize', ensureLogin(), OauthController.getAuthorize)
app.post('/oauth/authorize', ensureLogin(), OauthController.postAuthorize)
app.post('/oauth/token', OauthController.postToken)

createConnection(connectionOptions[ENV]).then(connection => {
    app.listen(app.get('port'), () => {
        console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'))
        console.log('Press CTRL-C to stop\n')
    })
}).catch(error => console.log(error))
