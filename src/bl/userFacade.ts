import { CACHE } from '../InMemoryCache'

export class UserFacade {

    static async getById(id: string) {
        return CACHE.findUserById(id)
    }

    static async getByEmailAndPassword(email: string, password: string) {
        return CACHE.findUserByEmailAndPassword(email, password)
    }

}
