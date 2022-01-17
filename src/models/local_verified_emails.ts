import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
export default class LocalVerifiedEmail
  extends BaseEntity
  implements ILocalVerifiedEmail
{
  @PrimaryColumn('uuid', { update: false })
  userId: string

  @Column({ type: 'varchar', unique: true, update: false })
  @Index({ unique: true })
  email: string
}

export interface ILocalVerifiedEmail {
  userId: string
  email: string
}
