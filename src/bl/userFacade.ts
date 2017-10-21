import { getRepository } from 'typeorm'

import { OAuth2User } from '../db/User'

export class UserFacade {

    static async getById(id: string) {
        return await getRepository(OAuth2User).findOne({
            id
        })
    }

    static async getByEmail(email: string) {
        return await getRepository(OAuth2User).findOne({
            email
        })
    }

    static async getByEmailAndPassword(email: string, password: string) {
        return await getRepository(OAuth2User).findOne({
            email,
            password
        })
    }

}
