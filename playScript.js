const readline = require('readline');
const Game = require('./game.js');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const game = new Game(reader);
game.run(() => game.reader.close());
