import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('local_user')
export default class LocalUser extends BaseEntity implements ILocalUser {
  @PrimaryColumn('uuid', { generated: true })
  _id: string

  @Column('varchar', { unique: true })
  @Index('local_user_email_index', { unique: true })
  email: string

  @Column('varchar', { name: 'first_name' })
  firstName: string

  @Column('varchar', { name: 'last_name' })
  lastName: string

  @Column({
    type: 'varchar',
    name: 'full_name',
    generatedType: 'STORED',
    asExpression: `concat(first_name, ' ', last_name)`,
    insert: false,
    update: false,
  })
  fullName: string

  @Column('varchar', { name: 'photo_url' })
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

  @Column('boolean', { default: false })
  verified: boolean

  @Column('varchar', { nullable: true })
  verificationToken?: string | undefined

  @Column('varchar', { nullable: true })
  verificationTokenExpiry?: number | undefined

  @Column('varchar', { nullable: true })
  passwordResetToken?: string | undefined

  @Column('varchar', { nullable: true })
  passwordResetTokenExpiry?: string | undefined
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
  verified: boolean
  verificationToken?: string
  verificationTokenExpiry?: number
  passwordResetToken?: string
  passwordResetTokenExpiry?: string
}
