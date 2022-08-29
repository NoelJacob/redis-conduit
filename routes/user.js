import {Router} from 'express';
import {getCurrentUser, updateCurrentUser} from '../services/user.js';

const router = Router();

/**
 * Gets the currently logged-in user
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await getCurrentUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Updated user information for current user
 */
router.put('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await updateCurrentUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
