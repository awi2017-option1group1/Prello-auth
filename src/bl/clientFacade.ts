import { getRepository } from 'typeorm'

import { OAuth2Client } from '../entities/Client'

export class ClientFacade {

    static async getById(id: string) {
        return await getRepository(OAuth2Client).findOne({
            id
        })
    }

    static async getByIdAndSecret(id: string, secret: string) {
        if (secret) {
            return await getRepository(OAuth2Client).findOne({
                id,
                clientSecret: secret
            })           
        } else {
            return await ClientFacade.getById(id)
        }
    }

}
