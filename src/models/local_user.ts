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

  @Column('varchar')
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
  verificationToken?: string
  verificationTokenExpiry?: number
  passwordResetToken?: string
  passwordResetTokenExpiry?: number
}
