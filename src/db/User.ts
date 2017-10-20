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
        type: 'varchar'
    })
    password: string

    @Column({
        name: 'pseudo',
        type: 'varchar'
    })
    pseudo: string

}
