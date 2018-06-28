const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/index');
const categoryCtrl = require('../controllers/category');
const userCtrl = require('../controllers/user');
const topicCtrl = require('../controllers/topic');

module.exports = router;

router.get('/', indexCtrl.showIndex)
      .get('/signin', userCtrl.showSignin)
      .post('/signin', userCtrl.handleSignin)
      .get('/signup', userCtrl.showSignup)
      .post('/signup', userCtrl.handleSignup)
      .get('/signout', userCtrl.handleSignout);