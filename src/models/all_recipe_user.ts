import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm'

export enum Recipe {
  LOCAL = 'local',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
}

@Entity()
export default class AllRecipeUser
  extends BaseEntity
  implements IAllRecipeUser
{
  @PrimaryColumn('uuid')
  userId: string

  @Column('enum', { enum: Recipe, default: Recipe.LOCAL })
  recipe: Recipe

  @CreateDateColumn()
  createdAt: Date
}

export interface IAllRecipeUser {
  userId: string
  recipe: Recipe
  createdAt: Date
}
