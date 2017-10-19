import { CACHE } from '../InMemoryCache'

export class ClientFacade {

    static async getById(id: string) {
        return CACHE.getClientById(id)
    }

    static async getByIdAndSecret(id: string, secret: string) {
        return CACHE.getClient(id, secret)
    }

}
