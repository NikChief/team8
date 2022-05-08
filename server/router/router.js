const Router = require('express').Router();
const postController = require('../controllers/post-controller');
const SteamGamesController = require('../controllers/steamGames-controller');
const userController = require('../controllers/user-controller');

Router.get('/initUsers', userController.getUsersList);
Router.get('/initGames', SteamGamesController.getListGames);
Router.get('/initPosts', postController.getPostsList);
Router.post('/validateProfile', userController.validateProfile);
Router.post('/addPost', postController.addPost);
Router.post('/userGames', userController.userGames);
Router.put('/updateDescribe', userController.updateDescribe);

module.exports = Router;
