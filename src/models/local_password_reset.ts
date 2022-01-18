import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm'

import LocalUser from './local_user'

@Entity('local_user')
export default class LocalPasswordReset
  extends BaseEntity
  implements ILocalPasswordReset
{
  @OneToOne(_ => LocalUser, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn()
  userId: string

  @Column({ type: 'varchar', update: false })
  email: string

  @Column('varchar', { unique: true })
  @Index({ unique: true })
  passwordResetToken: string

  @Column('bigint')
  passwordResetTokenExpiry: number
}

export interface ILocalPasswordReset {
  userId: string
  email: string
  passwordResetToken: string
  passwordResetTokenExpiry: number
}
