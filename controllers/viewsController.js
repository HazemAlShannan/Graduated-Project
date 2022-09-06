const User = require('../models/userModel');
const Workspace = require('../models/workspaceModel');
const Board = require('../models/boardModel');
const catchAsync = require('../utils/catchAsync');
const Card = require('./../models/cardModel');
const mongoose = require('mongoose');

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Signup',
  });
};

exports.getOverview = catchAsync(async (req, res, next) => {
  const workspaces = await Workspace.find({ wsOwner: req.user.id }).select(
    'id wsName slug'
  );
  const boards = await Workspace.findOne({
    wsOwner: req.user.id,
    slug: 'my-workspace',
  })
    .select('id wsName wsMembers boards slug wsDescreption type')
    .populate({
      path: 'boards',
      select: 'id bName bStartDate bEndDate bDescription bMembers static',
    })
    .populate('wsMembers.memberId', 'id name photo workspaces email gender');
  const cards = await Workspace.findOne({
    wsOwner: req.user.id,
    slug: 'my-workspace',
  })
    .select('id boards')
    .populate({ path: 'boards', select: 'id cards bName', populate: 'cards' });
  let arr = [];
  cards.boards.map((board) => {
    let members = '';
    board.cards.map((tag) => {
      members = `${members},${tag.membersTag.toString()}`;
    });
    arr.push(new Set(members.split(',').slice(1)));
    arr.forEach((setInArr) => setInArr.delete(''));
  });
  console.log(cards);

  res.status(200).render('home', {
    title: 'Home page',
    workspaces,
    boards,
    arr,
  });
});

exports.getOverview2 = catchAsync(async (req, res, next) => {
  console.log(req.params, req.user._id);
  const workspaces = await Workspace.find({ wsOwner: req.user._id });
  const createdBoards = await Workspace.findOne({
    wsOwner: req.user._id,
    slug: req.params.slug,
  })
    .populate({ path: 'boards' })
    .populate('wsMembers.memberId');
  const cards = await Workspace.findOne({
    wsOwner: req.user._id,
    slug: req.params.slug,
  })
    .select('id boards')
    .populate({ path: 'boards', select: 'id cards', populate: 'cards' });
  console.log(workspaces);
  console.log(createdBoards);
  console.log(cards);
  let arr = [];
  if (cards.boards)
    cards.boards.map((board) => {
      let members = '';
      board.cards.map((tag) => {
        members = `${members},${tag.membersTag.toString()}`;
      });
      arr.push(new Set(members.split(',').slice(1)));
      arr.forEach((setInArr) => setInArr.delete(''));
    });
  res.status(200).render('home2', {
    title: 'Home page',
    workspaces,
    createdBoards,
    arr,
  });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const workspaces = await Workspace.find({ wsOwner: req.user.id });
  const boards = await Board.find({ bOwner: req.user.id });
  res.status(200).render('profile', {
    title: 'My Profile',
    workspaces,
    boards,
  });
});

exports.getCardsPage = catchAsync(async (req, res, next) => {
  const board = await Board.findById(req.params.bId)
    .populate({
      path: 'cards',
      populate: { path: 'membersTag', select: 'name photo role email' },
    })
    .populate({ path: 'workspace', populate: 'boards' })
    .populate('bMembers');
  const newBoard = await Board.findById(req.params.bId).populate('cards');
  // let arr = [];
  // cards.boards.map((board) => {
  //   let members = '';
  //   board.cards.map((tag) => {
  //     members = `${members},${tag.membersTag.toString()}`;
  //   });
  //   arr.push(new Set(members.split(',').slice(1)));
  //   arr.forEach((setInArr) => setInArr.delete(''));
  // });

  let arr = [];
  let members = '';
  newBoard.cards.map((tag) => {
    members = `${members},${tag.membersTag.toString()}`;
  });
  arr.push(new Set(members.split(',').slice(1)));
  arr.forEach((setInArr) => setInArr.delete(''));
  console.log(members);
  console.log(arr);

  res.status(200).render('card', { title: 'cards', board, arr });
});

exports.getAboutUsPage = catchAsync(async (req, res, next) => {
  res.status(200).render('About');
});
exports.getcanvasPage = catchAsync(async (req, res, next) => {
  res.status(200).render('canvas');
});

exports.getGettingReadyPage = catchAsync(async (req, res, next) => {
  res.status(200).render('gettingReady');
});

exports.getInvitedWsPage = catchAsync(async (req, res, next) => {
  const workspaces = await Workspace.find({
    wsOwner: { $ne: req.user.id },
    'wsMembers.memberId': mongoose.Types.ObjectId(req.user.id),
  }).populate('wsOwner');
  res.status(200).render('invitedWS', {
    title: 'Home page',
    workspaces,
  });
});

exports.getInvitedWsBoards = catchAsync(async (req, res, next) => {
  const workspaces = await Workspace.find({
    wsOwner: { $ne: req.user.id },
    'wsMembers.memberId': mongoose.Types.ObjectId(req.user.id),
  });
  const createdBoards = await Workspace.findById(req.params.wsId)
    .populate({ path: 'boards', ref: 'Board', populate: 'bOwner' })
    .populate('wsMembers.memberId');
  const cards = await Workspace.findById(req.params.wsId)
    .select('id boards')
    .populate({ path: 'boards', select: 'id cards', populate: 'cards' });
  let arr = [];
  // if (cards.boards)
  cards.boards.map((board) => {
    let members = '';
    board.cards.map((tag) => {
      members = `${members},${tag.membersTag.toString()}`;
    });
    arr.push(new Set(members.split(',').slice(1)));
    arr.forEach((setInArr) => setInArr.delete(''));
  });
  console.log(createdBoards);
  res.status(200).render('invitedBoardsInWS', {
    title: 'Home page',
    workspaces,
    createdBoards,
    arr,
  });
});

exports.getpublicWorkspacePage = catchAsync(async (req, res, next) => {
  const workspaces = await Workspace.find({
    wsOwner: { $ne: req.user.id },
    type: 'public',
    'wsMembers.memberId': { $ne: mongoose.Types.ObjectId(req.user.id) },
  }).populate('wsOwner');
  res.status(200).render('publicWorkspaces', {
    title: 'Home page',
    workspaces,
  });
});
exports.getpublicWorkspace = catchAsync(async (req, res, next) => {
  const createdBoards = await Workspace.findById(req.params.pWsId)
    .populate({ path: 'boards', ref: 'Board', populate: 'bOwner' })
    .populate({ path: 'wsMembers.memberId' });
  const cards = await Workspace.findById(req.params.pWsId)
    .select('id boards')
    .populate({ path: 'boards', select: 'id cards', populate: 'cards' });
  let arr = [];
  cards.boards.map((board) => {
    let members = '';
    board.cards.map((tag) => {
      members = `${members},${tag.membersTag.toString()}`;
    });
    arr.push(new Set(members.split(',').slice(1)));
    arr.forEach((setInArr) => setInArr.delete(''));
  });
  res.status(200).render('invitedBoardsInWS', {
    title: 'Home page',
    createdBoards,
    arr,
  });
});

exports.getSearchPublicWorkspacePage = catchAsync(async (req, res, next) => {
  const slug = req.params.name;
  const workspaces = await Workspace.find({
    slug,
    type: 'public',
    'wsMembers.memberId': { $ne: mongoose.Types.ObjectId(req.user.id) },
  }).populate('wsOwner');
  console.log(workspaces);
  res.status(200).render('publicWorkspaces', {
    title: 'Home page',
    workspaces,
  });
});
