import { Knex } from 'knex'
import { IAllRecipeUser } from 'knex/types/tables'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV?: 'production' | 'development' | 'test'
      readonly PORT?: number
      readonly SESSION_SECRET?: string
      readonly COOKIE_SECRET?: string
    }
  }

  namespace Express {
    interface User extends IAllRecipeUser {}
  }

  declare const __DEV__: boolean
}

declare module 'knex/types/tables' {
  interface IAllRecipeUserInsert {
    userId: string
  }
  interface IAllRecipeUser extends IAllRecipeUserInsert {
    recipe: Recipe
    createdAt: Date
  }

  interface IEmailVerificationUpdate {
    verificationToken: string
    verificationTokenExpiry: number
  }
  interface IEmailVerification extends IEmailVerificationUpdate {
    _id: string
    email: string
  }

  interface ILocalPasswordReset {
    userId: string
    email: string
    passwordResetToken: string
    passwordResetTokenExpiry: number
  }

  interface ILocalUserInsert {
    email: string
    firstName: string
    lastName: string
    photoUrl?: string
    birthDate: string
    hash: string
    salt: string
  }
  interface ILocalUser extends ILocalUserInsert {
    _id: string
    fullName: string
    photoUrl: string
    createdAt: Date
    updatedAt: Date
  }

  interface ILocalVerifiedEmail {
    userId: string
    email: string
  }

  interface Tables {
    local_user: Knex.CompositeTableType<ILocalUser, ILocalUserInsert>
    local_verified_email: Knex.CompositeTableType<ILocalVerifiedEmail>
    local_password_reset: Knex.CompositeTableType<ILocalPasswordReset>
    email_verification: Knex.CompositeTableType<
      IEmailVerification,
      IEmailVerification,
      IEmailVerificationUpdate,
      IEmailVerificationUpdate
    >
    all_recipe_user: Knex.CompositeTableType<
      IAllRecipeUser,
      IAllRecipeUserInsert & Knex.Raw
    >
  }
}

export {}
