import { config } from '../config'

const Oauth2Service = require('oauth').OAuth2

export const GithubService = new Oauth2Service(
    config.github.clientID, 
    config.github.clientSecret, 
    'https://github.com/', 
    'login/oauth/authorize', 
    'login/oauth/access_token'
)
