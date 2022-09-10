import jwt from 'jsonwebtoken'

export class ServerError extends Error {
  constructor({status, error}) {
    super()
    this.status = status
    this.error = error
  }
}

export function auth(req, res, next) {
  try {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  const payload = jwt.verify(token, process.env.JWT_SECRET)
  req.body.id = payload.id
  } catch {
    res.status(401).send()
    return
  }
  next()
}

export function optionalAuth(req, res, next) {
  if ('authorization' in req.headers) {
    auth(req, res, next)
    return 
  }
  else next()
}