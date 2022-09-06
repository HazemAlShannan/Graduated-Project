const User = require('./../models/userModel');
const Workspace = require('./../models/workspaceModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// const sharp = require('sharp');
let mongoose = require('mongoose');

// to Upload Image:
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.file.filename}`);
  next();
};

// exports.uploadUserPhoto = upload.single('photo');

// //to Set the Token Afer Change Passowrd:
// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };
// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };
//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
//   res.cookie('jwt', token, cookieOptions);
//   user.password = undefined;
//   res.status(statusCode).json({
//     status: 'success',
//     token,
//     data: {
//       user,
//     },
//   });
// };

// API:
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new AppError('there is no users yet', 400));
  res.status(200).json({
    status: 'success',
    data: { users },
  });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate(
    'workspaces',
    'wsName wsMembers slug'
  );

  if (!user) return next(new AppError('no user found with that id', 404));
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'name', 'email', 'position');
  if (req.file) filterBody.photo = req.file.filename;
  if (req.body.password) {
    const user = await User.findById(req.user.id).select('+password');
    if (req.body.password !== req.body.passwordConfirm)
      return next(new AppError('your passwords not match', 401));
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.position) user.position = req.body.position;
    await user.save();
    createSendToken(user, 200, res);
  } else {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
});

exports.saveUserInterests = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    userInterests: `${req.body.userInterests}`,
  });
  req.userInterests = req.body.userInterests;
  next();
});

exports.addMembers = catchAsync(async (req, res, next) => {
  const { id, email } = req.body;
  if (email === req.user.email)
    return next(new AppError('You cannot invite your self', 400));
  const newMember = await User.findOneAndUpdate(
    { email },
    { $addToSet: { invitedWorkspaces: id } }
  );
  if (!newMember)
    return next(
      new AppError('there is no user with this email address !!', 400)
    );
  if (newMember.invitedWorkspaces.includes(id))
    return next(new AppError('this member already invited !!', 400));
  res.status(200).json({
    status: 'success',
    data: newMember,
  });
});

exports.membersAccept = catchAsync(async (req, res, next) => {
  const { accept, wsId } = req.body;
  if (accept) {
    let id = mongoose.Types.ObjectId();
    const workspace = await Workspace.findByIdAndUpdate(
      wsId,
      {
        $addToSet: {
          wsMembers: {
            _id: id,
            memberId: mongoose.Types.ObjectId(req.user.id),
            role: 'user',
          },
        },
      },
      { new: true }
    );
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { invitedWorkspaces: workspace._id },
      $addToSet: { workspaces: workspace._id },
    });
    res.status(200).json({
      status: 'success',
      data: user,
      workspace,
    });
  } else {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { invitedWorkspaces: wsId },
      },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
});

exports.resetWS = catchAsync(async (req, res, next) => {
  console.log(req.body);
  await Workspace.findByIdAndDelete(req.body.wsIdForReset);
  const userInterests = req.user.userInterests;
  req.userInterests = userInterests;
  console.log('1');
  // res.status(200).json({
  //   status: 'success',
  //   data: null,
  // });
  next();
});
