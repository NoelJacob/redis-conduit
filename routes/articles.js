import {Router} from 'express';
import * as services from '../services/articles.js';

const router = Router();

/**
 * Get most recent articles from users you follow. Use query
 * parameters to limit. Auth is required
 */
router.get('/feed', async (req, res, next) => {
  const options = {
    limit: req.query['limit'],
    offset: req.query['offset']
  };

  try {
    const result = await services.getArticlesFeed(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get most recent articles globally. Use query parameters to
 * filter results. Auth is optional
 */
router.get('/', async (req, res, next) => {
  const options = {
    tag: req.query['tag'],
    author: req.query['author'],
    favorited: req.query['favorited'],
    limit: req.query['limit'],
    offset: req.query['offset']
  };

  try {
    const result = await services.getArticles(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Create an article. Auth is required
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await services.createArticle(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get an article. Auth not required
 */
router.get('/:slug', async (req, res, next) => {
  const options = {
    slug: req.params['slug']
  };

  try {
    const result = await services.getArticle(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update an article. Auth is required
 */
router.put('/:slug', async (req, res, next) => {
  const options = {
    body: req.body,
    slug: req.params['slug']
  };

  try {
    const result = await services.updateArticle(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete an article. Auth is required
 */
router.delete('/:slug', async (req, res, next) => {
  const options = {
    slug: req.params['slug']
  };

  try {
    const result = await services.deleteArticle(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get the comments for an article. Auth is optional
 */
router.get('/:slug/comments', async (req, res, next) => {
  const options = {
    slug: req.params['slug']
  };

  try {
    const result = await services.getArticleComments(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a comment for an article. Auth is required
 */
router.post('/:slug/comments', async (req, res, next) => {
  const options = {
    body: req.body,
    slug: req.params['slug']
  };

  try {
    const result = await services.createArticleComment(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a comment for an article. Auth is required
 */
router.delete('/:slug/comments/:id', async (req, res, next) => {
  const options = {
    slug: req.params['slug'],
    id: req.params['id']
  };

  try {
    const result = await services.deleteArticleComment(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Favorite an article. Auth is required
 */
router.post('/:slug/favorite', async (req, res, next) => {
  const options = {
    slug: req.params['slug']
  };

  try {
    const result = await services.createArticleFavorite(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Unfavorite an article. Auth is required
 */
router.delete('/:slug/favorite', async (req, res, next) => {
  const options = {
    slug: req.params['slug']
  };

  try {
    const result = await services.deleteArticleFavorite(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router
