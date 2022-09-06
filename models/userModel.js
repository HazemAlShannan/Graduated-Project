const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Workspace = require('./workspaceModel');
const Card = require('./cardModel');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a user must have a name'],
      minlength: [3, 'a user name must have more or equal than 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'a user must have an E-Mail'],
      unique: true,
      loadClass: true,
      validate: [validator.isEmail, 'please provide a valid E-Mail'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'supervisor'],
      default: 'admin',
    },
    workspaces: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Workspace',
      },
    ],
    userInterests: { type: String, enum: ['AI', 'ML', 'WD'] },
    invitedWorkspaces: [{ type: mongoose.Schema.ObjectId, ref: 'Workspace' }],
    tagsOnCards: [{ type: mongoose.Schema.ObjectId, ref: 'Card' }],
    password: {
      type: String,
      required: [true, 'a user must have a password'],
      minlength: [8, 'a password must have more or equal than 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    PasswordResetToken: String,
    PasswordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    // workspaces: mongoose.Schema.Types.ObjectId,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexing:

// Virtual Property:

//Document Middleware:
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  await Workspace.findByIdAndUpdate(this.workspaces[0], {
    wsMembers: [this.id],
  });
  next();
});

// userSchema.post('save', async function () {
//   const d = workspacesController.createDefaultWS;
//   this.workspaces.shift(d.id);
// });

//query middleware:
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Methods:
userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.PasswordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.PasswordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// Model:
const User = mongoose.model('User', userSchema);
module.exports = User;
