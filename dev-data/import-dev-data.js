const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Board = require('./../models/boardModel');
const Card = require('./../models/cardModel');
const User = require('./../models/userModel');
const Workspace = require('./../models/workspaceModel');

dotenv.config({ path: `${__dirname}/../config.env` });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then((con) => {
//   console.log('DB Connection Successful..');
// });

const localDB = process.env.DATABASE_LOCAL;

mongoose.connect(localDB).then((con) => {
  console.log('DB Connection Successful..');
});

// import data into DB :
const workspaces = JSON.parse(
  fs.readFileSync(`${__dirname}/workspaces.json`, 'utf-8')
);
const boards = JSON.parse(
  fs.readFileSync(`${__dirname}/staticBoard.json`, 'utf-8')
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const cards = JSON.parse(fs.readFileSync(`${__dirname}/cards.json`, 'utf-8'));

const importData = async () => {
  try {
    await Board.create(boards);
    await User.create(users, { validateBeforeSave: false });
    await Card.create(cards);
    await Workspace.create(workspaces);
    console.log('Data successfully loded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//delete ALL data from DB :
const deletedata = async () => {
  try {
    await Board.deleteMany();
    await User.deleteMany();
    await Card.deleteMany();
    await Workspace.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deletedata();
}
