const express = require('express');
const boardController = require('./../controllers/boardController');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(boardController.getAllBoards)
  .post(authController.protect, boardController.createBoard);

router.use(authController.protect);

router.delete('/deleteBoard', boardController.deleteBoard);
router.patch('/:bId', boardController.editBoard);

module.exports = router;
