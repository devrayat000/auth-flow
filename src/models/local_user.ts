import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { hash, genSalt, compare } from 'bcryptjs'

@Entity('local_user')
export default class LocalUser extends BaseEntity implements ILocalUser {
  @PrimaryColumn('uuid', { generated: 'uuid', insert: false, update: false })
  _id: string

  @Column({ type: 'varchar', unique: true, update: false })
  @Index('local_user_email_index', { unique: true })
  email: string

  @Column('varchar')
  firstName: string

  @Column('varchar')
  lastName: string

  @Column({
    type: 'varchar',
    generatedType: 'STORED',
    asExpression: `first_name || ' ' || last_name`,
    insert: false,
    update: false,
  })
  fullName: string

  @Column('varchar', { default: 'default.png' })
  photoUrl: string

  @Column('date')
  birthDate: string

  @Column('varchar')
  hash: string

  @Column('varchar')
  salt: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  private static readonly SALT_ROUND = 10

  static async hashPassword(payload: string) {
    const salt = await genSalt(this.SALT_ROUND)
    const hashed = await hash(payload, salt)

    return { salt, hash: hashed }
  }

  async verifyPassword(payload: string) {
    return await compare(payload, this.hash)
  }
}

export interface ILocalUser {
  _id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  photoUrl: string
  birthDate: string
  hash: string
  salt: string
  createdAt: Date
  updatedAt: Date
}
