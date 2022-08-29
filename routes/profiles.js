import {Router} from 'express';
import * as services from '../services/profiles.js';

const router = Router();

/**
 * Get a profile of a user of the system. Auth is optional
 */
router.get('/:username', async (req, res, next) => {
  const options = {
    username: req.params['username']
  };

  try {
    const result = await services.getProfileByUsername(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Follow a user by username
 */
router.post('/:username/follow', async (req, res, next) => {
  const options = {
    username: req.params['username']
  };

  try {
    const result = await services.followUserByUsername(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Unfollow a user by username
 */
router.delete('/:username/follow', async (req, res, next) => {
  const options = {
    username: req.params['username']
  };

  try {
    const result = await services.unfollowUserByUsername(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
