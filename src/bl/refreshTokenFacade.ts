import { CACHE } from '../InMemoryCache'

export class RefreshTokenFacade {

    static async getById(id: string) {
        return CACHE.getRefreshToken(id)
    }

}
