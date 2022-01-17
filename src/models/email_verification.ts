import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity('local_user')
export default class EmailVerification
  extends BaseEntity
  implements IEmailVerification
{
  @PrimaryColumn('uuid', { update: false })
  _id: string

  @Column({ type: 'varchar', unique: true, update: false })
  @Index({ unique: true })
  email: string

  @Column('varchar', { nullable: true })
  verificationToken: string

  @Column('bigint', { nullable: true })
  verificationTokenExpiry: number
}

export interface IEmailVerification {
  _id: string
  email: string
  verificationToken: string
  verificationTokenExpiry: number
}
