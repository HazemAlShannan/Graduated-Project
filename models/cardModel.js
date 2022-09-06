const mongoose = require('mongoose');
const Board = require('./boardModel');
const User = require('./userModel');

const cardSchema = new mongoose.Schema({
  board: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
    required: [true, 'Card must belong to a board.'],
  },
  cardName: {
    type: String,
    required: [true, 'Card must have to a name.'],
  },
  tasks: [{ name: String, done: Boolean }],
  isDone: { type: Boolean, default: false },
  membersTag: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  cardOwner: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

cardSchema.index({ cardName: 1, tasks: 1 }, { unique: true });

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
