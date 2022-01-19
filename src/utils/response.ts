export class MyResponse {
  public status: string
  public message: string

  constructor(status: string, message: string)
  constructor(status: string, message: string, additional: object)
  constructor(status: string, message: string, additional?: object) {
    this.status = status
    this.message = message
    if (additional) {
      for (const key in additional) {
        if (Object.prototype.hasOwnProperty.call(additional, key)) {
          Object.defineProperty(
            this,
            key,
            additional[key as keyof typeof additional]
          )
        }
      }
    }
  }
}
//
