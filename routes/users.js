import {Router} from 'express';
import {login, createUser} from '../services/users';

const router = new Router();

/**
 * Login for existing user
 */
router.post('/login', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await login(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Register a new user
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await createUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
