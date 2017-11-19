import { ConnectionOptions } from 'typeorm'

export interface GithubConfig {
    clientID: string
    clientSecret: string
    callbackURL: string
    userAgent: string
}

export interface ServerConfig {
    host: string
    port: number
    apiSuffix: string
    authSuffix: string
}

export interface InternalOAuth {
    clientId: string
    clientSecret: string
    redirectUri: string
}

export interface Config {
    env: 'development' | 'production' | 'test'

    loginCookieName: string
    loginDefaultRedirect: string
    internalToken: string
    redirectCookieName: string

    github: GithubConfig
    server: ServerConfig
    database: ConnectionOptions

    zendesk: InternalOAuth
}

export const config: Config = {
    env: process.env.NODE_ENV || 'development',
    
    loginCookieName: process.env.LOGIN_COOKIE_NAME || 'photon',
    loginDefaultRedirect: process.env.LOGIN_DEFAULT_REDIRECT || 'overview',
    internalToken: process.env.INTERNAL_TOKEN || 'prello123456789',
    redirectCookieName: 'redirect',

    github: {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        callbackURL: process.env.GITHUB_CALLBACK_URL || '',
        userAgent: process.env.GITHUB_CLIENT_NAME || ''
    },

    server: {
        host: process.env.SERVER_HOST || 'http://localhost',
        port: process.env.PORT || 8000,
        apiSuffix: process.env.API_SUFFIX || 'api',
        authSuffix: process.env.AUTH_SUFFIX || 'auth'
    },

    database: {
        type: process.env.DATABASE_TYPE || 'postgres',
        ssl: process.env.DATABASE_SSL === 'true',
        url: process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5434/dev_prello'
    },

    zendesk: {
        clientId: process.env.INTERNAL_OAUTH_ZENDESK_CLIENT_ID || '9fc19d15-4a3a-4373-8f50-c1b478a8051b',
        clientSecret: process.env.INTERNAL_OAUTH_ZENDESK_CLIENT_SECRET || '0927e397-8be8-4216-935b-53e3e4424261',
        redirectUri: process.env.INTERNAL_OAUTH_ZENDESK_CLIENT_REDIRECT_URI || 'http://localhost:4567/oauth.html',
    }
}
