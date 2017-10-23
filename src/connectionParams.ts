import { ConnectionOptions } from 'typeorm'

export interface MultipleConnections {
    [key: string]: ConnectionOptions
}

export const connectionOptions: MultipleConnections = {
    'development': {
        type: 'postgres',
        host: 'localhost',
        port: 5434,
        username: 'postgres',
        password: 'root',
        database: 'dev_prello',
        logging: ['query', 'error'],
        synchronize: false,
        entities: [
            `${__dirname}/entities/*.js`
        ],
    },
    'production': {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [
            `${__dirname}/entities/*.js`
        ],
    }
}
