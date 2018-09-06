const prompt = require('prompt');

let gameStatus = null;
const board = ['_','_','_','_','_','_','_','_','_'];
let currentPlayer = 'X';


const newGame = (board) => {
  getInput(board, currentPlayer);
}

const isValidMove = (board, space) => {
  return board[space - 1] === '_';
}

const makeMove = (board, space, playerToken) => {
  board[space - 1] = playerToken;
}

const displayBoard = (board) => {
  console.log(`${board[0]}|${board[1]}|${board[2]}\n${board[3]}|${board[4]}|${board[5]}\n${board[6]}|${board[7]}|${board[8]}`);
}

const nextPlayer = (player) => {
  currentPlayer = player === 'X' ? 'O' : 'X';
  return currentPlayer;
}

const checkForEndOfGame = (board, player) => {
  if (!board.includes('_')) {
    gameStatus = 'It was a tie!';
  }
}

const getInput = (board, player) => {
  displayBoard(board);
  console.log('Type a position to make a move (1 - 9)');
  prompt.start();
  prompt.get(['space'], (err, result) => {
    console.log('\n');
    if (isValidMove(board, Number(result.space))) {
      makeMove(board, Number(result.space), player);
      checkForEndOfGame(board, player);
      if (!gameStatus) getInput(board, nextPlayer(player));
      else {
        displayBoard(board);
        console.log(gameStatus);
      }
    } else {
      console.log('Invalid move!');
      getInput(board, player);
    }
  });
}

newGame(board);
