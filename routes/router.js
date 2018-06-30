const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/index');
const categoryCtrl = require('../controllers/category');
const userCtrl = require('../controllers/user');
const topicCtrl = require('../controllers/topic');

module.exports = router;

//首页路由
router.get('/', indexCtrl.showIndex);

//用户路由
router.get('/signin', userCtrl.showSignin)
      .post('/signin', userCtrl.handleSignin)
      .get('/signup', userCtrl.showSignup)
      .post('/signup', userCtrl.handleSignup)
      .get('/signout', userCtrl.handleSignout);

//话题路由
router.get('/topic/create', topicCtrl.showCreate)
      .post('/topic/create', topicCtrl.handleCreate)
      .get('/topic/:topicID', topicCtrl.showTopic)
      .get('/topic/:topicID/edit', topicCtrl.showEdit)
      .post('/topic/:topicID/edit', topicCtrl.handleEdit)
      .get('/topic/:topicID/delete', topicCtrl.handleDelete)