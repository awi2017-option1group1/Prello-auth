import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'

import { OAuth2Client } from './Client'
import { OAuth2User } from './User'

@Entity('oauth_access_token')
export class OAuth2AccessToken {

    @PrimaryColumn({
        name: 'access_token',
        type: 'varchar'
    })
    accessToken: string

    @Column({
        name: 'access_token_expires_at',
        type: 'date'
    })
    accessTokenExpiresAt: Date

    @Column({
        name: 'scope',
        type: 'varchar',
        nullable: true
    })
    scope: string

    @ManyToOne(type => OAuth2User)
    user: OAuth2User

    @ManyToOne(type => OAuth2Client)
    client: OAuth2Client

}
