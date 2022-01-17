import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('local_user')
export default class LocalPasswordReset
  extends BaseEntity
  implements ILocalPasswordReset
{
  @PrimaryColumn('uuid', { update: false })
  _id: string

  @Column({ type: 'varchar', unique: true, update: false })
  @Index({ unique: true })
  email: string

  @Column('varchar')
  passwordResetToken: string

  @Column('bigint')
  passwordResetTokenExpiry: number
}

export interface ILocalPasswordReset {
  _id: string
  email: string
  passwordResetToken: string
  passwordResetTokenExpiry: number
}
