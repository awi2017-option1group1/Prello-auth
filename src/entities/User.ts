import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class OAuth2User {

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    uid: number

    @Column({
        name: 'uuid',
        type: 'varchar',
        unique: true
    })
    @Generated('uuid')
    id: string

    @Column({
        name: 'email',
        type: 'varchar',
        unique: true
    })
    email: string

    @Column({
        name: 'password',
        type: 'varchar',
        select: false
    })
    password: string

    @Column({
        name: 'username',
        type: 'varchar'
    })
    username: string

    @Column({
        type: 'varchar'
    })
    avatarColor: string

    @Column({
        type: 'boolean',
        default: false
    })
    confirmed: boolean

    @Column({
        name: 'token',
        type: 'varchar',
        nullable: true
    })
    token?: string

}
