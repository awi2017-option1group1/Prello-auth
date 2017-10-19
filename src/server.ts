import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { authenticateMiddleware } from './oauthMiddlewares'

import { LoginController } from './routes/login'
import { OauthController } from './routes/oauth'

import passport, { ensureLogin } from './passport'

export const ENV = process.env.NODE_ENV || 'development'

// Set up Express and Oauth2-Node
const app = express()
app.set('port', process.env.PORT || 8000) 
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

app.get('/secret', authenticateMiddleware, (req, res) => {
    res.send('Secret area') 
})

app.get('/oauth/authorize', ensureLogin(), OauthController.getAuthorize)
app.post('/oauth/authorize', ensureLogin(), OauthController.postAuthorize)
app.post('/oauth/token', OauthController.postToken)

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'))
    console.log('Press CTRL-C to stop\n')
})
