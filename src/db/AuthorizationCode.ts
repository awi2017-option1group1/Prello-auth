import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'

import { OAuth2Client } from './Client'
import { OAuth2User } from './User'

@Entity('oauth_authorization_code')
export class OAuth2AuthorizationCode {

    @PrimaryColumn({
        name: 'authorization_code',
        type: 'varchar'
    })
    authorizationCode: string

    @Column({
        name: 'authorization_code_expires_at',
        type: 'date'
    })
    expiresAt: Date

    @Column({
        name: 'redirect_uri',
        type: 'varchar'
    })
    redirectUri: string

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
