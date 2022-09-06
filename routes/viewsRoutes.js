const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/About', viewsController.getAboutUsPage);
router.use(authController.protect);
router.get('/getting-ready', viewsController.getGettingReadyPage);
router.get('/canvas', viewsController.getcanvasPage);
router.get('/profile', viewsController.getProfile);
router.get(['/my-workspace', '/'], viewsController.getOverview);
router.get('/invitedWS', viewsController.getInvitedWsPage);
router.get('/publicWorkspaces', viewsController.getpublicWorkspacePage);
router.get(
  '/publicWorkspaces/search/:name',
  viewsController.getSearchPublicWorkspacePage
);
router.get('/publicWorkspace/:pWsId', viewsController.getpublicWorkspace);
router.get('/invitedWS/:wsId', viewsController.getInvitedWsBoards);
router.get('/:slug', viewsController.getOverview2);
router.get(
  [
    '/:wsId/:bId',
    '/publicWorkspace/:wsId/:bId',
    '/invitedWS/:wsId/:bId',
    '/:wsName/:wsId/:bId',
  ],
  viewsController.getCardsPage
);

module.exports = router;
