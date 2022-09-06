const mongoose = require('mongoose');
const User = require('./userModel');
const Workspace = require('./workspaceModel');
const Card = require('./cardModel');

const boardSchema = new mongoose.Schema(
  {
    bName: {
      type: String,
      required: [true, 'Board name cannot be empty'],
    },
    bOwner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    bStartDate: {
      type: Date,
      default: Date.now(),
    },
    bEndDate: {
      type: Date,
    },
    bMembers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ], // maybe virtual
    bDescription: {
      type: String,
    },
    workspace: {
      type: mongoose.Schema.ObjectId,
      ref: 'Workspace',
    },
    static: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

boardSchema.virtual('cards', {
  ref: 'Card',
  foreignField: 'board',
  localField: '_id',
});

// boardSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'members',
//     select: 'name photo -_id',
//   });
//   next();
// });

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
