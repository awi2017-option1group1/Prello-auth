import { getRepository } from 'typeorm'

import { OAuth2RefreshToken } from '../db/RefreshToken'

export class RefreshTokenFacade {

    static async getById(id: string) {
        return await getRepository(OAuth2RefreshToken).findOne({ 
            refreshToken: id 
        }).then(token => token!)
    }

}
