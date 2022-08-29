import {Router} from 'express';
import {getTags} from '../services/tags';

const router = new Router();

/**
 * Get tags. Auth not required
 */
router.get('/', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await getTags(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
