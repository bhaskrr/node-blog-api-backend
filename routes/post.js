const authenticate = require('../middlewares').authenticate;
const router = require('express').Router();
const postController = require('../controllers/postController');

router.get('/:id' ,postController.post_get);

router.get('/:id/publish', authenticate, postController.post_publish);

router.get('/:id/unpublish', authenticate, postController.post_unpublish);

// viewers can view comments
router.get('/:id/comments/new', postController.comment_new_get);

router.post('/:id/comments/new', postController.comment_new_post);

module.exports = router;