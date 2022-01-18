import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm'

import LocalUser from './local_user'

@Entity()
export default class LocalVerifiedEmail
  extends BaseEntity
  implements ILocalVerifiedEmail
{
  @OneToOne(_ => LocalUser, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn()
  userId: string

  @Column({ type: 'varchar', update: false })
  @Index({ unique: true })
  email: string
}

export interface ILocalVerifiedEmail {
  userId: string
  email: string
}
