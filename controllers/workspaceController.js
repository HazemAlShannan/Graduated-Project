const User = require('./../models/userModel');
const Workspace = require('./../models/workspaceModel');
const Board = require('./../models/boardModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');

exports.getAllWS = catchAsync(async (req, res, next) => {
  const workspaces = await Workspace.find();
  if (!workspaces)
    return next(new AppError('There is no workspace for you', 404));
  res.status(200).json({
    status: 'success',
    data: workspaces,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const workspace = await Workspace.findById(req.params.wsId)
    .populate('boards')
    .exec();
  if (!workspace)
    return next(new AppError('There is no workspace with that id', 404));
  res.status(200).json({
    status: 'success',
    data: workspace,
  });
});

exports.createDefaultWS = catchAsync(async (req, res, next) => {
  let id = mongoose.Types.ObjectId();
  data = {
    wsName: 'my workspace',
    background: '',
    wsDescreption: 'start you job with our workspace',
    type: 'private',
    wsOwner: req.user.id,
    wsMembers: [{ memberId: req.user.id, role: 'owner', _id: id }],
  };
  const newWorkSpace = await Workspace.create(data);
  await User.findByIdAndUpdate(req.user.id, {
    $push: { workspaces: newWorkSpace.id },
  });
  if (!newWorkSpace)
    return next(new AppError('cannot create default workspace', 400));
  req.defaultWS = newWorkSpace;
  next();
});

exports.createWS = catchAsync(async (req, res, next) => {
  let id = mongoose.Types.ObjectId();
  if (req.body.wsOwner && req.body.wsOwner !== req.user._id.toString()) {
    const { wsName, type, wsOwner, wsDescreption } = req.body;
    const wsMembers = [
      { _id: mongoose.Types.ObjectId(), memberId: wsOwner, role: 'owner' },
      { _id: mongoose.Types.ObjectId(), memberId: req.user._id, role: 'admin' },
    ];
    const workspace = { wsName, type, wsOwner, wsDescreption, wsMembers };
    const newWorkSpace = await Workspace.create(workspace);
    await User.findByIdAndUpdate(req.user.id, {
      $push: { workspaces: newWorkSpace.id },
    });
    await User.findByIdAndUpdate(wsOwner, {
      $push: { workspaces: newWorkSpace.id },
    });
    res.status(201).json({
      status: 'success',
      data: newWorkSpace,
    });
  } else {
    const { wsName, type, wsDescreption } = req.body;
    const wsMembers = [{ _id: id, memberId: req.user._id, role: 'owner' }];
    const wsOwner = req.user._id;
    const workspace = { wsName, type, wsDescreption, wsOwner, wsMembers };
    const newWorkSpace = await Workspace.create(workspace);
    await User.findByIdAndUpdate(req.user.id, {
      $push: { workspaces: newWorkSpace.id },
    });
    res.status(201).json({
      status: 'success',
      data: newWorkSpace,
    });
  }
});

exports.editWS = async (req, res, next) => {
  const { wsName, wsDescreption, type } = req.body;
  const workspace = await Workspace.findByIdAndUpdate(req.params.wsId, {
    wsDescreption,
    wsName,
    type,
  });
  if (!workspace)
    return next(new AppError('this workspace dosen`t exist right now', 400));
  res.status(200).json({
    status: 'success',
    data: workspace,
  });
};

exports.deleteWS = catchAsync(async (req, res, next) => {
  const workspace = await Workspace.findByIdAndDelete(req.body.deletedWS);
  if (!workspace)
    return next(new AppError('There is no workspace with that id'));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.applyChangeFoUserRole = catchAsync(async (req, res, next) => {
  console.log(req.body);
  if (req.body.newRole === 'delete') {
    const mId = mongoose.Types.ObjectId(req.body.userId);
    const workspace = await Workspace.findByIdAndUpdate(req.body.wsId, {
      $pull: { wsMembers: { memberId: mId } },
    });
    res.status(200).json({
      status: 'success',
      data: workspace,
    });
  }
  const workspace = await Workspace.findById(req.body.wsId);
  workspace.wsMembers.forEach(async (member) => {
    if (member.memberId.toString() === req.body.userId) {
      member.role = req.body.newRole;
      console.log('done very will');
    }
  });
  workspace.markModified('wsMembers');
  await workspace.save();
  if (!workspace) return next(new AppError('workspace not found', 404));
  res.status(200).json({
    status: 'success',
    data: workspace,
  });
});

exports.detectTagsType = catchAsync(async (req, res, next) => {
  const board = await Board.findById(req.params.bId).populate('workspace');
  const isHasTheUser = board.workspace.wsMembers.some((id) => {
    return id.memberId.toString() === req.user._id.toString();
  });
  console.log(isHasTheUser);
  res.status(200).json({
    status: 'success',
    data: board,
    isHasTheUser,
  });
});
// (href=`/${workspace.slug}`)= `${workspace.wsName}`
// (href=`/${workspace.slug}`)

exports.deleteMemberFromWS = catchAsync(async (req, res, next) => {
  const deleteMember = await Workspace.find(req.body.wsId);
  console.log(deleteMember);
  res.status(200).json({
    status: 'success',
    data: deleteMember,
  });
});
