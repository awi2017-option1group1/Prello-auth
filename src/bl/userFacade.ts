import { getRepository } from 'typeorm'
import { v4 as uuid } from 'uuid'

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

    static async getByToken(token: string) {
        return await getRepository(OAuth2User).findOne({
            token
        })
    }

    static async authenticate(uid: number) {
        const token = uuid()
        await getRepository(OAuth2User).update({ uid }, { token })
        return token
    }

}
