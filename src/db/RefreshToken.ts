import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'

import { OAuth2Client } from './Client'
import { OAuth2User } from './User'

@Entity('oauth_refresh_token')
export class OAuth2RefreshToken {

    @PrimaryColumn({
        name: 'refresh_token',
        type: 'varchar'
    })
    refreshToken: string

    @Column({
        name: 'refresh_token_expires_at',
        type: 'date'
    })
    refreshTokenExpiresAt: Date

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
