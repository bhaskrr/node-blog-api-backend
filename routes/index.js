var express = require('express');
var router = express.Router();
const authenticate = require('../middlewares').authenticate;

const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index_get);

router.get('/posts', indexController.posts_get);

router.get('/posts/new', authenticate, indexController.create_post_get);

router.post('/posts/new', authenticate, indexController.create_post_post);

module.exports = router;
