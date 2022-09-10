import {userRepo} from '../lib/entities.js'
import {hash} from 'argon2';
import { ServerError } from '../lib/helpers.js';

export async function getCurrentUser(body) {
  const result = await userRepo.fetch(body.id)
  return {
    data: {user: result.user}
  };
}

export async function updateCurrentUser(body) {
const result = await userRepo.fetch(body.id)
const {email, username, bio, image, password} = body.user
if(email) {
  // const emailExists = await userRepo.search().where('email').eq(email).count()
  // if(emailExists !== 0) throw new ServerError({
  //   error: `Email ${email} exists`
  // })
  result.email = email
}
if(username) {
  // const usernameExists = await userRepo.search().where('username').eq(username).count()
  // if(usernameExists !== 0) throw new ServerError({
  //   error: `Username ${username} exists`
  // }) 
  result.username = username
}
if(bio) result.bio = bio
if(image) result.image = image
if(password) result.hashedPass = await hash(password)
await userRepo.save(result)
  return {
    data: {user: result.user}
  };
}
