import ServerError from '../lib/errors.js';
import {userRepo} from '../lib/entities.js';

export async function login(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'login ok!'
  };
}

export async function createUser(options) {
  const {username, email, password} = options.body.user
  console.log("s");
  // TODO validation

  const newUser = userRepo.createEntity({email, username})
  await newUser.setHashedPass(password)
  await userRepo.save(newUser)

  return {
    status: 201,
    data: {
      email: newUser.email, token: newUser.token, username: newUser.username, bio: newUser.bio, image: newUser.image
    }
  };
}
