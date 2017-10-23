import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { createConnection } from 'typeorm'
import  { fromConfig } from './database'

import { config } from './config'

import { authenticateMiddleware } from './util/oauthMiddlewares'

import { CallbackController } from './routes/callback'
import { GithubController } from './routes/github'
import { LoginController } from './routes/login'
import { OauthController } from './routes/oauth'
import { UserController } from './routes/user'

import passport, { ensureLogin } from './util/passport'

console.log(config)

// Set up Express and Oauth2-Node
const app = express()
app.set('port', config.server.port) 
app.engine('ejs', require('ejs-locals'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

// Define routes
app.get('/', (req, res) => {  
    res.json({ healthcheck: 'ok' })
})

app.get('/login', LoginController.getLogin)
app.post('/login', LoginController.postLogin)
app.get('/logout', LoginController.getLogout)

app.get('/github', GithubController.getGithubLogin)
app.get('/github/callback', GithubController.getGithubLoginCallback)

app.get('/me', ensureLogin(), UserController.getMe)
app.get('/tokens', authenticateMiddleware, UserController.getTokens)
// app.get('/tokens', authenticateMiddleware, UserController.getTokens) get data about the requester
// app.delete('/users/tokens/:clientId', LoginController.getLogin) revoke the token

app.get('/token/zendesk', CallbackController.getZendeskToken)
app.get('/token/electron', CallbackController.getElectronToken)

app.get('/oauth/authorize', ensureLogin(), OauthController.getAuthorize)
app.post('/oauth/authorize', ensureLogin(), OauthController.postAuthorize)
app.post('/oauth/token', OauthController.postToken)

createConnection(fromConfig()).then(connection => {
    app.listen(app.get('port'), () => {
        console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'))
        console.log('Press CTRL-C to stop\n')
    })
}).catch(error => console.log(error))
