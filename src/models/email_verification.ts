import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('local_user')
export default class EmailVerification
  extends BaseEntity
  implements IEmailVerification
{
  @PrimaryColumn('uuid', { update: false })
  _id: string

  @Column({ type: 'varchar', update: false })
  email: string

  @Column('varchar', { unique: true })
  @Index({ unique: true })
  verificationToken: string

  @Column('bigint')
  verificationTokenExpiry: number
}

export interface IEmailVerification {
  _id: string
  email: string
  verificationToken: string
  verificationTokenExpiry: number
}
