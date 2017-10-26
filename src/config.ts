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
    loginCookieName: process.env.LOGIN_COOKIE_NAME,
    loginDefaultRedirect: process.env.LOGIN_DEFAULT_REDIRECT,

    env: process.env.NODE_ENV,

    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        userAgent: process.env.GITHUB_CLIENT_NAME
    },

    server: {
        host: process.env.HOST,
        port: process.env.PORT,
        apiSuffix: process.env.API_SUFFIX,
        authSuffix: process.env.AUTH_SUFFIX
    },

    database: {
        type: process.env.DATABASE_TYPE,
        ssl: process.env.DATABASE_SSL === 'true',
        url: process.env.DATABASE_URL
    }
}
