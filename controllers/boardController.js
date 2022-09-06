const Board = require('./../models/boardModel');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getAllBoards = catchAsync(async (req, res, next) => {
  const boards = await Board.find();

  res.status(200).json({
    status: 'success',
    data: {
      boards,
    },
  });
});

exports.createBoard = catchAsync(async (req, res, next) => {
  if (!req.body.bOwner) req.body.bOwner = req.user.id;
  req.body.bMembers = [req.user.id];

  const newBoard = await Board.create(req.body);
  if (!newBoard) return next(new AppError('connt create the board', 400));

  res.status(201).json({
    status: 'success',
    data: {
      board: newBoard,
    },
  });
});

exports.createDeafultBoards = catchAsync(async (req, res, next) => {
  const AI = {
    nameB1: 'AI 1',
    descB1: 'bla bla for AI project 1',
    nameB2: 'AI 2',
    descB2: 'bla bla for AI project 2',
  };
  const ML = {
    nameB1: 'ML 1',
    descB1: 'bla bla for ML project 1',
    nameB2: 'ML 2',
    descB2: 'bla bla for ML project 2',
  };
  const WD = {
    nameB1: 'WD 1',
    descB1: 'bla bla for WD project 1',
    nameB2: 'WD 2',
    descB2: 'bla bla for WD project 2',
  };
  const userInterests = { AI, ML, WD };
  const interestingIn = userInterests[req.userInterests];
  const defaultBoards = async (interesting) => {
    const board1 = await Board.create({
      bName: interesting.nameB1,
      bDescription: interesting.descB1,
      workspace: req.defaultWS.id,
      static: true,
      bMembers: [req.user.id],
      bOwner: req.user.id,
    });
    const board2 = await Board.create({
      bName: interesting.nameB2,
      bDescription: interesting.descB2,
      workspace: req.defaultWS.id,
      static: true,
      bMembers: [req.user.id],
      bOwner: req.user.id,
    });
    if (!board1 || !board2)
      return next(new AppError('cannot create default Boards', 400));
    return { board1, board2 };
  };
  const createdDefaultBoards = await defaultBoards(interestingIn);
  req.defaultBoardsForNewUser = createdDefaultBoards;
  next();
});

exports.deleteBoard = catchAsync(async (req, res, next) => {
  const board = await Board.findByIdAndDelete(req.body.boardId);
  if (!board)
    return next(new AppError('board you try to delete it dosen`t exist', 400));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.editBoard = catchAsync(async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);
  const { bName, bEndDate } = req.body;
  const bDescription = req.body.bDescreption;
  const board = await Board.findByIdAndUpdate(req.params.bId, {
    bName,
    bDescription,
    bEndDate,
  });
  if (!board)
    return next(new AppError('this board dosen`t exist right now !!', 400));
  res.status(200).json({
    status: 'success',
    data: board,
  });
});
