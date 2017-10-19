import { User } from 'oauth2-server'

export type OAuth2User = User &  {
    email: string
    password: string
    name: string
}
