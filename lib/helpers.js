import jwt from 'jsonwebtoken'

export class ServerError extends Error {
  constructor({status, error}) {
    super()
    this.status = status
    this.error = error
  }
}

export function authMiddleware(req, res, next) {
  const unauthenticated = ['^\/users\/login$', '^\/users$', '^\/articles\/[a-z]*$', '^\/articles\/[a-z]*\/comments$', '^\/tags$']
  if (new RegExp(unauthenticated.join('|'), "m").test(req.path)) {
    next()
    return
  }

  auth(req)
  next()
}

function auth(req) {
  const authHeader = req.headers['Authorization']
  const token = authHeader.split(' ')[1]
  const payload = jwt.verify(token, process.env.JWT_SECRET)

  console.log(payload)
}
