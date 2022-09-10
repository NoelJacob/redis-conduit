import {Entity, Schema} from 'redis-om'
import {client} from './redis.js';
import jwt from 'jsonwebtoken'

class User extends Entity {
  get user() {
    return {
      email: this.email,
      username: this.username,
      bio: this.bio,
      image: this.image,
      token: jwt.sign({id: this.entityId}, process.env.JWT_SECRET)
    }
  }

  async profile(id) {
    return {
      username: this.username,
      bio: this.bio,
      image: this.image,
      following: id ? (await userRepo.fetch(id)).following.includes(this.entityId) : false
    }
  }
}
const userSchema = new Schema(User, {
  email: {type: 'string'},
  username: {type: 'string'},
  bio: {type: 'text', matcher: 'dm:en'},
  image: {type: 'string', indexed: false},
  hashedPass: {type: 'string', indexed: false},
  following: {type: 'string[]'}
})
export const userRepo = client.fetchRepository(userSchema)

class Article extends Entity {
  async article(id) {
    return {
      slug : this.slug,
      title: this.title,
      description: this.description,
      body: this.body,
      tagList: this.tagList,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      favorited: id ? this.favoritedBy.includes(id) : false,
      favoritesCount: this.favoritedBy.length,
      author: await (await userRepo.fetch(this.author)).profile(id)
    }
  }
 }
const articleSchema = new Schema(Article, {
  slug: {type: 'string'},
  title: {type: 'text', matcher: 'dm:en'},
  description: {type: 'text', matcher:'dm:en'},
  body: {type: 'text', matcher: 'dm:en'},
  tagList: {type: 'string[]'},
  createdAt: {type: 'date', sortable: true},
  updatedAt: {type: 'date'},
  favoritedBy: {type: 'string[]', indexed: false},
  author: {type: 'string'}
})
export const articleRepo = client.fetchRepository(articleSchema)

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