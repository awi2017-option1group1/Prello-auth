import { ConnectionOptions } from 'typeorm'

import { config } from './config'

export const fromConfig = (): ConnectionOptions => ({
    ...config.database,
    synchronize: false,
    entities: [
        `${__dirname}/entities/*.js`
    ],
    logging: ['query', 'error']
})
