import { Token } from 'oauth2-server'

import { CACHE } from '../InMemoryCache'
import { OAuth2Client } from '../db/Client'
import { OAuth2User } from '../db/User'

export class AccessTokenFacade {

    static async getById(id: string) {
        return CACHE.getAccessToken(id)
    }

    static async getByClientAndUser(clientId: string, userId: string) {
        return CACHE.getAccessTokenByClientAndUser(clientId, userId)
    }

    static async create(token: Token, client: OAuth2Client, user: OAuth2User) {
        return CACHE.saveToken(token, client, user)
    }

    // static async delete(email: string, password: string) {
    //     return CACHE.findUserByEmailAndPassword(email, password)
    // }

}
