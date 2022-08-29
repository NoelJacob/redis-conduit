export default class ServerError extends Error {
  constructor({status,error}) {
    super()
    this.status = status
    this.error = error
  }
}
