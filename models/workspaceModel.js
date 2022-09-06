const mongoose = require('mongoose');
const User = require('./userModel');
const Board = require('./boardModel');
const slugify = require('slugify');

const members = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    memberId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    role: { type: String, enum: ['admin', 'user', 'Owner'], default: 'user' },
  },
  { validateBeforeSave: true }
);
// const members = new mongoose.Schema({
//   type: mongoose.Schema.Types.Mixed,
// });

const workspaceSchema = new mongoose.Schema(
  {
    wsName: {
      type: String,
      required: [true, 'a workspace must have a name'],
    },
    wsOwner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    background: {
      type: String,
      default: 'back-ground.jpg',
    },
    wsDescreption: {
      type: String,
      default: 'there is no descreption for this workspace',
    },
    type: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
    },
    wsMembers: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
      value: members,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

workspaceSchema.index({ wsOwner: 1, wsName: 1 }, { unique: true });

workspaceSchema.virtual('boards', {
  ref: 'Board',
  foreignField: 'workspace',
  localField: '_id',
});

workspaceSchema.pre('save', function (next) {
  this.slug = slugify(this.wsName, { lower: true });
  next();
});
workspaceSchema.pre('save', function (next) {
  this.wsMembers.forEach((member) => {
    let id = mongoose.Types.ObjectId(member.memberId);
    member.memberId = id;
  });
  next();
});
workspaceSchema.pre('save', function (next) {
  this.wsMembers.forEach((member) => {
    let id = mongoose.Types.ObjectId(member._id);
    let memId = mongoose.Types.ObjectId(member.memberId);
    member._id = id;
    member.memberId = memId;
  });
  next();
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;
