import { AuthorizationCode } from 'oauth2-server'

import { CACHE } from '../InMemoryCache'
import { OAuth2Client } from '../db/Client'
import { OAuth2User } from '../db/User'

export class AuthorizationCodeFacade {

    static async getById(id: string) {
        return CACHE.getAuthorizationCode(id)
    }

    static async create(code: AuthorizationCode, client: OAuth2Client, user: OAuth2User) {
        return CACHE.saveAuthorizationCode(code, client, user)
    }

    static async delete(code: AuthorizationCode) {
        return CACHE.revokeAuthorizationCode(code)
    }

}
