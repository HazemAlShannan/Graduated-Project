const Card = require('./../models/cardModel');
const User = require('./../models/userModel');
const Board = require('./../models/boardModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');

exports.getAllCards = catchAsync(async (req, res, next) => {
  const cards = await Card.find({});
  if (!cards) return next(new AppError('there is no cards yet !', 400));
  res.status(200).json({
    status: 'success',
    data: cards,
  });
});

exports.getCard = catchAsync(async (req, res, next) => {
  const card = await Card.findById(req.params.cId);
  if (!card) return next(new AppError('there is no card with that id !', 400));
  res.status(200).json({
    status: 'success',
    data: card,
  });
});

exports.getAllCardsOnBoard = catchAsync(async (req, res, next) => {
  const cards = await Board.findById(req.params.id).populate('cards');
  if (!cards)
    return next(new AppError('there is no board with that id !', 400));
  res.status(200).json({
    status: 'success',
    data: cards,
  });
});

exports.createCard = catchAsync(async (req, res, next) => {
  const { cardName, bId } = req.body;
  const newCard = await Card.create({
    cardName,
    board: bId,
    cardOwner: req.user.id,
  });
  if (!newCard)
    return next(
      new AppError('field to create this card please try again !!', 400)
    );
  res.status(200).json({
    status: 'success',
    data: newCard,
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { task, cardId } = req.body;
  const card = await Card.findById(cardId)
    .select('id board membersTag')
    .populate({ path: 'board', select: 'id workspace', populate: 'workspace' });
  let con1 = false;
  let con2 = false;
  ////////////////////////////////////////////////////////
  card.board.workspace.wsMembers.forEach((member) => {
    if (
      member.memberId.toString() === req.user.id &&
      (member.role === 'admin' || member.role === 'owner')
    ) {
      console.log('equal');
      con1 = true;
    }
  });
  ////////
  card.membersTag.forEach((memb) => {
    console.log(memb.toString());
    console.log(req.user.id);
    if (memb.toString() === req.user.id) {
      console.log('final');
      con2 = true;
    }
  });
  ////////////////////////////////////////////////////
  console.log(con1, con2);
  if (con1 || con2) {
    const newTask = await Card.findByIdAndUpdate(
      cardId,
      {
        $push: { tasks: { name: task, done: false } },
      },
      { new: true }
    );
    if (!newTask)
      return next(new AppError('Field to create Task, Please try again', 400));
    res.status(200).json({
      status: 'success',
      data: newTask,
    });
  } else {
    return next(new AppError('u cannot add a task', 400));
  }
});

exports.changeCheckbox = catchAsync(async (req, res, next) => {
  const { isDone, cardId, taskName } = req.body;

  const card = await Card.findById(cardId)
    .select('id board membersTag')
    .populate({ path: 'board', select: 'id workspace', populate: 'workspace' });
  let con1 = false;
  let con2 = false;
  ////////////////////////////////////////////////////////
  card.board.workspace.wsMembers.forEach((member) => {
    if (
      member.memberId.toString() === req.user.id &&
      (member.role === 'admin' || member.role === 'owner')
    ) {
      console.log('equal');
      con1 = true;
    }
  });
  ////////
  card.membersTag.forEach((memb) => {
    console.log(memb.toString());
    console.log(req.user.id);
    if (memb.toString() === req.user.id) {
      console.log('final');
      con2 = true;
    }
  });
  //////////////////////////////////////
  if (con1 || con2) {
    console.log('x');
    let i = 0;
    const cardupdated = await Card.findById(cardId);
    cardupdated.tasks.forEach(async (task) => {
      if (task.name === taskName.toLowerCase()) {
        cardupdated.tasks[i].done = isDone;
        await cardupdated.save().then(console.log('haha'));
      }
      ++i;
    });
    res.status(200).json({
      status: 'success',
      data: cardupdated,
    });
  } else {
    return next(new AppError('u cannot check this', 400));
  }
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  const { cardId } = req.body;
  console.log(req.body);
  const deletedCard = await Card.findByIdAndDelete(cardId);
  if (!deletedCard) return next(new AppError('this card not found', 400));
  res.status(204).json({ status: 'success', data: '' });
});

exports.tagNewMember = catchAsync(async (req, res, next) => {
  const { email, cardId } = req.body;
  const cardToWS = await Card.findById(cardId).populate({
    path: 'board',
    populate: 'workspace',
  });
  const member = await User.findOne({ email });

  if (
    cardToWS.board.workspace.type === 'private' &&
    !member.workspaces.includes(
      mongoose.Types.ObjectId(cardToWS.board.workspace.id)
    )
  )
    return next(
      new AppError(
        'you cannot tag this user cause this is a private workspace !!',
        400
      )
    );
  const tagedMember = await User.findOneAndUpdate(
    { email },
    { $addToSet: { tagsOnCards: cardId } }
  );
  if (tagedMember.tagsOnCards.includes(cardId))
    return next(new AppError('this member already tagged before'));
  const tagMemberCard = await Card.findByIdAndUpdate(cardId, {
    $addToSet: { membersTag: tagedMember._id },
  });
  if (!tagedMember)
    return next(new AppError('there is no user with this email !!', 400));
  if (!tagMemberCard)
    return next(new AppError('this card dosen`t exist !!', 400));
  res.status(200).json({ status: 'success', data: tagedMember, tagMemberCard });
});

exports.createDefaultCards = catchAsync(async (req, res, next) => {
  console.log(req.userInterests);
  console.log(req.defaultBoardsForNewUser);
  const board = [
    req.defaultBoardsForNewUser.board1.id,
    req.defaultBoardsForNewUser.board2.id,
  ];
  const cardOwner = req.user.id;
  const cardName1 = [
    'Introduction to ' + req.userInterests,
    `First move you should do`,
    `Tips And Ticks`,
    `Advanced ${req.userInterests}`,
  ];
  const cardName2 = [
    '2 Introduction to ' + req.userInterests,
    `2 First move you should do`,
    `2 Tips And Ticks`,
    `2 Advanced ${req.userInterests}`,
  ];
  const isDone = false;
  const tasks1 = [
    { name: 'first move to', done: false },
    { name: 'second move to', done: false },
    { name: 'third move to', done: false },
    { name: 'forth move to', done: false },
  ];
  const tasks2 = [
    { name: 'first move to', done: false },
    { name: 'second move to', done: false },
    { name: 'third move to', done: false },
    { name: 'forth move to', done: false },
  ];
  const tasks3 = [
    { name: 'first move to', done: false },
    { name: 'second move to', done: false },
    { name: 'third move to', done: false },
    { name: 'forth move to', done: false },
  ];
  const tasks4 = [
    { name: 'first move to', done: false },
    { name: 'second move to', done: false },
    { name: 'third move to', done: false },
    { name: 'forth move to', done: false },
  ];
  const AI1 = {
    board: board[0],
    cardOwner,
    tasks: tasks1,
    isDone,
    cardName: cardName1[0],
  };
  const AI2 = {
    board: board[0],
    cardOwner,
    tasks: tasks2,
    isDone,
    cardName: cardName1[1],
  };
  const AI3 = {
    board: board[0],
    cardOwner,
    tasks: tasks3,
    isDone,
    cardName: cardName1[2],
  };
  const AI4 = {
    board: board[0],
    cardOwner,
    tasks: tasks4,
    isDone,
    cardName: cardName1[3],
  };
  const AI5 = {
    board: board[1],
    cardOwner,
    tasks: tasks1,
    isDone,
    cardName: cardName2[0],
  };
  const AI6 = {
    board: board[1],
    cardOwner,
    tasks: tasks2,
    isDone,
    cardName: cardName2[1],
  };
  const AI7 = {
    board: board[1],
    cardOwner,
    tasks: tasks3,
    isDone,
    cardName: cardName2[2],
  };
  const AI8 = {
    board: board[1],
    cardOwner,
    tasks: tasks4,
    isDone,
    cardName: cardName2[3],
  };
  const ML = {};
  const WD = {};
  const createAI1 = await Card.create(AI1);
  const createAI2 = await Card.create(AI2);
  const createAI3 = await Card.create(AI3);
  const createAI4 = await Card.create(AI4);
  const createAI5 = await Card.create(AI5);
  const createAI6 = await Card.create(AI6);
  const createAI7 = await Card.create(AI7);
  const createAI8 = await Card.create(AI8);
  const createdCards = [
    createAI1,
    createAI2,
    createAI3,
    createAI4,
    createAI5,
    createAI6,
    createAI7,
    createAI8,
  ];
  res.status(201).json({
    status: 'success',
    data: {
      interestingIn: req.userInterests,
      workspace: req.defaultWS,
      boards: req.defaultBoardsForNewUser,
      createdCards,
    },
  });
});
