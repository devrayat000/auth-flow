import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export default class HttpError extends Error {
  public status: string
  constructor(public code: StatusCodes, message?: string) {
    super(message)
    this.status = ReasonPhrases[StatusCodes[code] as keyof typeof ReasonPhrases]
  }

  get response() {
    return {
      status: this.status,
      message: this.message,
    }
  }
}

export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message)
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message)
  }
}

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.BAD_REQUEST, message)
  }
}

export namespace AuthError {
  export enum Code {
    NOT_VERIFIED = 'auth/not-verified',
    USER_NOT_FOUND = 'auth/user-not-found',
    INCORRECT_PASSWORD = 'auth/incorrect-password',
    TOKEN_ERROR = 'auth/token-error',
    TOKEN_EXPIRED = 'auth/token-expired',
  }

  class AuthError extends InternalServerError {
    constructor(public status: Code, message?: string) {
      super(message)
    }
  }

  export class EmailNotVerified extends AuthError {
    constructor() {
      super(Code.NOT_VERIFIED, 'Email not verified!')
    }
  }

  export class UserNotFound extends AuthError {
    constructor() {
      super(Code.USER_NOT_FOUND, 'User not found!')
    }
  }

  export class PasswordIncorrect extends AuthError {
    constructor() {
      super(Code.INCORRECT_PASSWORD, 'Incorrect password!')
    }
  }

  export class TokenError extends BadRequestError {
    constructor() {
      super('Invalid token!')
      this.status = Code.TOKEN_ERROR
    }
  }

  export class TokenExpired extends BadRequestError {
    constructor() {
      super('Token Expired! Please Renew yout token.')
      this.status = Code.TOKEN_EXPIRED
    }
  }
}
