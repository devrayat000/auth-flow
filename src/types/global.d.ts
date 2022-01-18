declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV?: 'production' | 'development' | 'test'
      readonly PORT?: number
      readonly SESSION_SECRET?: string
      readonly COOKIE_SECRET?: string
    }
  }

  declare const __DEV__: boolean
}

export {}
