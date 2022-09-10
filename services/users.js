import {ServerError} from '../lib/helpers.js';
import {userRepo} from '../lib/entities.js';
import {hash, verify} from 'argon2';

export async function login(body) {
  const {email, password} = body.user
  if (email.length === 0 || password.lenth === 0) throw new ServerError({
      error: 'Email and Password required'
    })
  const result = await userRepo.search().where("email").eq(email).first()
  if(!result) return {status: 401}
  const verifiedPass = verify(result.hashedPass, password)
  if(verifiedPass) return {data: {user: result.user}} 
  else return {status: 401}
}

export async function createUser(body) {
  const {username, email, password} = body.user

  if(username.length === 0 || email.length === 0 || password.length ===0) throw new ServerError({
    error: 'Email, Username and Password is required'
  }) 
  if(password.length < 8 || password.length > 15) throw new ServerError({
    error: 'Password must be between 8 and 15 charecters'
  })

  const emailExists = await userRepo.search().where('email').eq(email).count()
  if(emailExists !== 0) throw new ServerError({
    error: `Email ${email} exists`
  })
  const usernameExists = await userRepo.search().where('username').eq(username).count()
  if(usernameExists !==0) throw new ServerError({
    error: `Username ${username} not available`
  }) 

  const hashedPass = await hash(password)
  const newUser = await userRepo.createAndSave({email, username, hashedPass})
  return {
    status: 201,
    data: {
      user: newUser.user
    }
  };
}
