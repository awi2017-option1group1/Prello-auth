import { getRepository } from 'typeorm'

import { AuthorizationCode } from 'oauth2-server'

import { OAuth2AuthorizationCode } from '../entities/AuthorizationCode'
import { OAuth2Client } from '../entities/Client'
import { OAuth2User } from '../entities/User'

export class AuthorizationCodeFacade {

    static async getById(id: string) {
        return await getRepository(OAuth2AuthorizationCode).findOne({
            relations: ['client', 'user'],
            where: {
                authorizationCode: id 
            } 
        }).then(code => {
            if (code) {
                const localCode = code!
                localCode.expiresAt = new Date(localCode.expiresAt)
                return localCode
            }
            return code!
        })
    }

    static async getOrCreate(code: AuthorizationCode, client: OAuth2Client, user: OAuth2User) {
        const localCode = await AuthorizationCodeFacade.getByClientAndUser(client.id, user.id)
        if (localCode) {
            return localCode
        } else {
            code.client = client
            code.user = user
            code.expiresAt = new Date(2048, 1)
            return await getRepository(OAuth2AuthorizationCode).save(code)   
        }
    }

    static async getByClientAndUser(clientId: string, userId: string) {
        return await getRepository(OAuth2AuthorizationCode)
            .createQueryBuilder('code')
            .leftJoin('code.user', 'user')
            .leftJoin('code.client', 'client')
            .where('user.id = :userId', { userId })
            .where('client.id = :clientId', { clientId })
            .getOne()
            .then(code => code!)
    }

    static async delete(code: AuthorizationCode) {
        await getRepository(OAuth2AuthorizationCode).deleteById(code.authorizationCode)
        return true
    }

}
