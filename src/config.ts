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

export interface Config {
    loginCookieName: string
    loginDefaultRedirect: string

    env: 'development' | 'production' | 'test'

    github: GithubConfig
    server: ServerConfig
    database: ConnectionOptions
}

export const config: Config = {
    loginCookieName: process.env.LOGIN_COOKIE_NAME || 'photon',
    loginDefaultRedirect: process.env.LOGIN_DEFAULT_REDIRECT || 'overview',

    env: process.env.NODE_ENV || 'development',

    github: {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost/auth/github/callback',
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
    }
}
