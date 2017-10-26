import { ConnectionOptions } from 'typeorm'

import { config } from './config'

export const fromConfig = (): ConnectionOptions => ({
    ...config.database,
    ssl: true,
    synchronize: false,
    entities: [
        `${__dirname}/entities/*.js`
    ],
    migrations: [
        `${__dirname}/migrations/*.js`
    ],
    logging: ['query', 'error']
})
