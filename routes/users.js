import {Router} from 'express';
import {login, createUser} from '../services/users.js';

const router = Router();

/**
 * Login for existing user
 */
router.post('/login', async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Register a new user
 */
router.post('/', async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
