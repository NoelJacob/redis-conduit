import {Entity, Schema} from 'redis-om'
import {client} from './redis.js';
import {hash} from 'argon2'

class User extends Entity {
  async setHashedPass(plaintextPassword) {
    this.hashedPass = await hash(plaintextPassword)
  }
}
const userSchema = new Schema(User, {
  email: {type: 'string', indexed: false},
  tokens: {type: 'string[]', indexed: false},
  username: {type: 'string'},
  bio: {type: 'text', matcher: 'dm:en'},
  image: {type: 'string', indexed: false},
  hashedPass: {type: 'string', indexed: false}
})
export const userRepo = client.fetchRepository(userSchema)

class Article extends Entity { }
const articleSchema = new Schema(Article, {
  slug: {type: 'string'},
  title: {type: 'string'},
  body: {type: 'text'},
  description: {type: 'text'},
  taglist: {type: 'string[]'},
  createdAt: {type: 'date'},
  updatedAt: {type: 'date'},
  favorited: {type: 'boolean'},
  favoritesCount: {type: 'number'},
  author: {type: 'string'}
})
export const articleRepo = client.fetchRepository(userSchema)

class Comment extends Entity { }
const commentSchema = new Schema(Comment, {
  id: {type: 'number'},
  createdAt: {type: 'date'},
  updatedAt: {type: 'date'},
  body: {type: 'text'},
  author: {type: 'string'}
})
export const commentRepo = client.fetchRepository(commentSchema)

await userRepo.createIndex()
await articleRepo.createIndex()
await commentRepo.createIndex()