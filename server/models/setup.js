import mongoose from 'mongoose';

import Game from './game.js';
import Player from './player.js';
import GameMode from './gameModes.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// try {
//   // const newGame = new Game({ mode: 'Classic', vp: 10, cardStack: true, duration: 45 });
//   // await newGame.save();
//   const newPlayer = new Player({ username: 'Hal Blood Prince' });
//   await newPlayer.save();
// } catch (error) {
//   console.log(error);
// }

db.once('open', function() {
  console.log("Connection Successful!");

  // // a document instance
  // var newGameMode = new GameMode({ label: 'Classic' });

  // // save model to database
  // newGameMode.save(function (err, book) {
  //   if (err) return console.error(err);
  //   console.log(book.username + " saved to bookstore collection.");
  // });

  // var newGameMode2 = new GameMode({ label: 'Ore for Wool' });

  // // save model to database
  // newGameMode2.save(function (err, book) {
  //   if (err) return console.error(err);
  //   console.log(book.username + " saved to bookstore collection.");
  // });
   

  // var newGameMode3 = new GameMode({ label: 'Seafarers' });

  // // save model to database
  // newGameMode3.save(function (err, book) {
  //   if (err) return console.error(err);
  //   console.log(book.username + " saved to bookstore collection.");
  // });

  // var newGameMode4 = new GameMode({ label: 'Harbormaster' });

  // // save model to database
  // newGameMode4.save(function (err, book) {
  //   if (err) return console.error(err);
  //   console.log(book.username + " saved to bookstore collection.");
  // });
   
   
  

  // a document instance
  var newPlayer = new Player({ username: 'Half Blood Prince' });

  // save model to database
  newPlayer.save(function (err, book) {
    if (err) return console.error(err);
    console.log(book.username + " saved to bookstore collection.");
  });

  // a document instance
  var newPlayer2 = new Player({ username: 'Ammar' });

  // save model to database
  newPlayer2.save(function (err, book) {
    if (err) return console.error(err);
    console.log(book.username + " saved to bookstore collection.");
  });

   // a document instance
   var newPlayer3 = new Player({ username: 'Irzam' });

   // save model to database
   newPlayer3.save(function (err, book) {
     if (err) return console.error(err);
     console.log(book.username + " saved to bookstore collection.");
   });

    // a document instance
  var newPlayer4 = new Player({ username: 'Shehbaz' });

  // save model to database
  newPlayer4.save(function (err, book) {
    if (err) return console.error(err);
    console.log(book.username + " saved to bookstore collection.");
  });

   // a document instance
   var newPlayer5 = new Player({ username: 'Faiz' });

   // save model to database
   newPlayer5.save(function (err, book) {
     if (err) return console.error(err);
     console.log(book.username + " saved to bookstore collection.");
   });
    
   
    
   
});