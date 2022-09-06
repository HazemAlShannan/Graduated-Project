const express = require('express');
const cardController = require('./../controllers/cardController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(cardController.getAllCards)
  .post(cardController.createCard);
router.patch('/createTask', cardController.createTask);
router.patch('/checkboxIsDone', cardController.changeCheckbox);
router.delete('/deleteCard', cardController.deleteCard);
router.patch('/tagMemberOnCard', cardController.tagNewMember);
router.get('/:cId', cardController.getCard);

module.exports = router;
