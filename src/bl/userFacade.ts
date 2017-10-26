import { getRepository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { compareSync } from 'bcrypt'

import { OAuth2User } from '../entities/User'

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
        const user = await UserFacade.getByEmail(email)
        if (user && compareSync(password, user.password)) {
            return user
        } else {
            return false
        }
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
