import ServerError from '../lib/errors';

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
  try {
    const {username, email, password} = options.body.user
  //  TODO validation
  } catch {
    throw new ServerError({
      status:500,
      error:'Malformed Request'
    });
  }



  return {
    status: 200,
    data: 'createUser ok!'
  };
}
