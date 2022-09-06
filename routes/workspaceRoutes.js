const express = require('express');
const workspaceController = require('./../controllers/workspaceController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(workspaceController.getAllWS)
  .post(workspaceController.createWS);

router.get('/deleteMember', workspaceController.deleteMemberFromWS);

router.patch('/setUserRole', workspaceController.applyChangeFoUserRole);
router.get('/tags/:bId', workspaceController.detectTagsType);

router
  .route('/:wsId')
  .get(workspaceController.getOne)
  .patch(workspaceController.editWS)
  .delete(workspaceController.deleteWS);

module.exports = router;
