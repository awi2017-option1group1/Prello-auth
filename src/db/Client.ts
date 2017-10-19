import { Client } from 'oauth2-server'

export type OAuth2Client = Client & {
    isTrusted: boolean
}
