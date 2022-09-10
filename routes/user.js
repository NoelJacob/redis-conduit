import {Router} from 'express';
import {getCurrentUser, updateCurrentUser} from '../services/user.js';
import { auth } from '../lib/helpers.js';

const router = Router();

/**
 * Gets the currently logged-in user
 */
router.get('/', auth, async (req, res, next) => {
  try {
    const result = await getCurrentUser(req.body);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Updated user information for current user
 */
router.put('/', auth, async (req, res, next) => {
  try {
    const result = await updateCurrentUser(req.body);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
