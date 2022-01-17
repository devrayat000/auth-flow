declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV?: 'production' | 'development' | 'test'
      readonly PORT?: number
    }
  }

  declare const __DEV__: boolean
}
