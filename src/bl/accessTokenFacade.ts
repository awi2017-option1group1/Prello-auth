import { getRepository } from 'typeorm'

import { Token } from 'oauth2-server'

import { OAuth2AccessToken } from '../db/AccessToken'
import { OAuth2Client } from '../db/Client'
import { OAuth2User } from '../db/User'

export class AccessTokenFacade {

    static async getById(id: string) {
        return await getRepository(OAuth2AccessToken).findOne({ 
            relations: ['client', 'user'],
            where: {
                accessToken: id 
            }
        }).then(token => {
            if (token) {
                const localToken = token!
                localToken.accessTokenExpiresAt = new Date(localToken.accessTokenExpiresAt)
                return localToken
            }
            return token!
        })
    }

    static async getByClientAndUser(clientId: string, userId: string) {
        return await getRepository(OAuth2AccessToken)
            .createQueryBuilder('token')
            .leftJoin('token.user', 'user')
            .leftJoin('token.client', 'client')
            .where('user.id = :userId', { userId })
            .where('client.id = :clientId', { clientId })
            .getOne()
            .then(token => token!)
    }

    static async getAllByUser(userId: string) {
        return await getRepository(OAuth2AccessToken)
            .createQueryBuilder('token')
            .leftJoin('token.user', 'user')
            .leftJoin('token.client', 'client')
            .where('user.id = :userId', { userId })
            .select([
                'token.accessTokenExpiresAt', 
                'token.scope', 
                'client.id', 
                'client.name', 
                'client.cid', 
                'user.id', 
                'user.uid'
            ])
            .getMany()
    }

    static async create(token: Token, client: OAuth2Client, user: OAuth2User) {
        token.client = client
        token.user = user
        token.accessTokenExpiresAt = new Date(2048, 1)
        return await getRepository(OAuth2AccessToken).save(token)
    }

    // static async deleteByClientAndUser(clientId: string, userId: string) {
    //     return await getRepository(OAuth2AccessToken).save(token)
    // }

}
