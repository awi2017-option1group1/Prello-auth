import { Token, AuthorizationCode, BaseModel, RequestAuthenticationModel, AuthorizationCodeModel } from 'oauth2-server'

import { OAuth2Client } from './db/Client'
import { OAuth2User } from './db/User'

// TODO: REMOVE THIS CLASS
class Cache implements BaseModel, RequestAuthenticationModel, AuthorizationCodeModel {

    private clients: OAuth2Client[] = [
        { 
            id: '1',
            name: 'App 1',
            clientSecret: 'abc123',
            isTrusted: true, 
            redirectUris: ['http://localhost:8000/oauth/callback'],
            grants: ['authorization_code'] 
        },
        { 
            id: '2',
            name: 'App 2',
            clientSecret: 'aaa',
            isTrusted: false, 
            redirectUris: ['http://localhost:8000/oauth/callback'],
            grants: ['authorization_code'] 
        }
    ]
    private users: OAuth2User[] = [
        {
            id: '1',
            email: 'admin',
            password: 'admin',
            name: 'Admin'
        },
        {
            id: '2',
            email: 'user',
            password: 'user',
            name: 'User'
        }
    ]
    private tokens: Token[] = []
    private codes: AuthorizationCode[] = []

    async getAuthorizationCode(authorizationCode: string) {
        const localCode = this.codes.find(c => c.authorizationCode === authorizationCode)

        if (!localCode) {
            return localCode!
        }

        return Object.assign(
            {}, 
            localCode!, 
            { client: await this.getClientById(localCode!.clientId) },
            { user: await this.findUserById(localCode!.userId) }
        )
    }

    async saveAuthorizationCode(code: AuthorizationCode, client: OAuth2Client, user: OAuth2User) {
        const newCode = {
            ...code,
            clientId: client.id,
            userId: user.id
        }
        this.codes.push(newCode)
        return newCode 
    }

    async revokeAuthorizationCode(code: AuthorizationCode) {
        this.codes = this.codes.filter(c => c.authorizationCode !== code.authorizationCode)
        return true
    }

    async getAccessToken(bearerToken: string) {
        const localToken = this.tokens.find(t => t.accessToken === bearerToken)

        if (!localToken) {
            return localToken!
        }

        return Object.assign(
            {}, 
            localToken!, 
            { client: await this.getClientById(localToken!.clientId) },
            { user: await this.findUserById(localToken!.userId) }
        )
    }

    async getAccessTokenByClientAndUser(clientId: string, userId: string) {
        const localToken = this.tokens.find(t => t.clientId === clientId && t.userId === userId)
        return (localToken) ? localToken : false
    }

    async verifyScope(token: Token, scope: string) {
        if (!scope.split(' ').every(s => ['*'].indexOf(s) >= 0)) {
            return false
        }
        return true
    }

    async getRefreshToken(bearerToken: string) {
        const localToken = this.tokens.find(t => t.refreshToken === bearerToken)
        return (localToken) ? localToken : false
    }

    async getClient(clientId: string, clientSecret: string) {
        if (!clientSecret) {
            return this.getClientById(clientId)
        }

        const localClient = this.clients.find(c => c.id === clientId && c.clientSecret === clientSecret)
        return (localClient) ? localClient : false
    }

    async getClientById(clientId: string) {
        const localClient = this.clients.find(c => c.id === clientId)
        return (localClient) ? localClient : false
    }

    async saveToken(token: Token, client: OAuth2Client, user: OAuth2User) {
        const newToken = {
            ...token,
            clientId: client.id,
            userId: user.id
        }
        this.tokens.push(newToken)
        return Object.assign(
            {}, 
            newToken, 
            { client: await this.getClientById(newToken.clientId) },
            { user: await this.findUserById(newToken.userId) }
        )
    }

    async findUserByEmailAndPassword(email: string, password: string) {
        const localUser = this.users.find(u => u.email === email && u.password === password)
        return (localUser) ? localUser : false
    }

    async findUserById(id: string) {
        const localUser = this.users.find(u => u.id === id)
        return (localUser) ? localUser : false
    }

}

export const CACHE = new Cache()
