const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares').authenticate;
const dashboardController = require('../controllers/dashboardController');


router.get('/', authenticate,  dashboardController.dashboard_get);

// router.get('/posts', authenticate, dashboardController.)

module.exports = router;