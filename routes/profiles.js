import {Router} from 'express';
import * as profiles from '../services/profiles';

const router = new Router();

/**
 * Get a profile of a user of the system. Auth is optional
 */
router.get('/:username', async (req, res, next) => {
  const options = {
    username: req.params['username']
  };

  try {
    const result = await profiles.getProfileByUsername(options);
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
    const result = await profiles.followUserByUsername(options);
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
    const result = await profiles.unfollowUserByUsername(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
