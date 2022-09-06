const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const workspacesController = require('./../controllers/workspaceController');
const boardController = require('./../controllers/boardController');
const cardController = require('./../controllers/cardController');

const router = express.Router();

// For Dev Only:
router.route('/').get(userController.getAllUsers);

//For Production:
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);

router.patch('/addMembers', userController.addMembers);
router.patch('/memberAccept', userController.membersAccept);
router.route('/me').get(userController.getMe, userController.getCurrentUser);
router.delete('/deleteMe', userController.deleteMe);
router.patch(
  '/updateMe',
  // userController.uploadUserPhoto,
  // userController.resizeUserPhoto,
  userController.updateMe
);
router.post(
  '/userInterests',
  userController.saveUserInterests,
  workspacesController.createDefaultWS,
  boardController.createDeafultBoards,
  cardController.createDefaultCards
);
router.delete(
  '/resetWS',
  userController.resetWS,
  workspacesController.createDefaultWS,
  boardController.createDeafultBoards,
  cardController.createDefaultCards
);

module.exports = router;
