import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm'

@Entity('client')
export class OAuth2Client {

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    cid: number

    @Column({
        name: 'client_id',
        type: 'varchar',
        unique: true
    })
    @Generated('uuid')
    id: string

    @Column({
        type: 'varchar'
    })
    name: string

    @Column({
        name: 'client_secret',
        type: 'varchar'
    })
    @Generated('uuid')
    clientSecret: string

    @Column({
        name: 'redirect_uris',
        type: 'simple-array'
    })
    redirectUris: string[]

    grants: string[] = ['authorization_code', 'refresh_token']

    @Column({
        name: 'is_trusted',
        type: 'boolean'
    })
    isTrusted: boolean
    
}
