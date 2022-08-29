import {Entity, Schema, Repository} from 'redis-om'
import {client} from './redis.js';

class User extends Entity {}
const userSchema = new Schema(User, {
  email: {type: 'string'},
  token: {type: 'string'},
  username: {type: 'string'},
  bio: {type: 'text'},
  image: {type: 'string'},
})
export const userRepo = client.fetchRepository(userSchema)

class Profile extends Entity {}
const profileSchema = new Schema(Profile, {
  following: {type: 'boolean'},
  username: {type: 'string'},
  bio: {type: 'string'},
  image: {type: 'string'}
})
export const profileRepo = client.fetchRepository(profileSchema)

class Article extends Entity {}
const articleSchema = new Schema(Article, {
  slug: {type: 'string'},
  title: {type: 'string'},
  body: {type: 'string[]'},
  description: {type: 'string[]'},
  taglist: [{type: 'string'}],
  createdAt: {type: 'date'},
  updatedAt: {type: 'date'},
  favorited: {type: 'boolean'},
  favoritesCount: {type: 'number'},
  author: Profile
})
export const userRepo = client.fetchRepository(userSchema)

class Comment extends Entity {}
const commentSchema = new Schema(Comment, {
  id: {type: 'number'},
  createdAt: {type: 'date'},
  updatedAt: {type: 'date'},
  body: {type: 'string[]'},
  author: Profile
})
export const commentRepo = client.fetchRepository(commentSchema)
