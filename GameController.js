import { Gameboard } from "./Gameboard.js";
const GameController = (function () {
  let currentPlayer = "X";
  let isGameContinuing = true;
  let _playerOne = null;
  let _playerTwo = null;
  const resetGame = () => {
    currentPlayer = "X";
    isGameContinuing = true;
  };

  const setPlayers = (p1, p2) => {
    _playerOne = p1;
    _playerTwo = p2;
  };

  const _getPlayerBySymbol = (symbol) => {
    if (_playerOne.symbol === symbol) {
      return _playerOne;
    } else {
      return _playerTwo;
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };
  const checkWin = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return true;
      }
    }
    return false;
  };
  const checkTie = (board) => {
    return board.every((cell) => cell !== "");
  };

  const playRound = (index) => {
    const didTheMoveWork = Gameboard.placeMark(index, currentPlayer);
    if (didTheMoveWork) {
      const currentBoard = Gameboard.getBoard();
      if (checkWin(currentBoard)) {
        return "win";
      }
      if (checkTie(currentBoard)) {
        return "tie";
      }
      switchPlayer();
      return "continue";
    } else {
      return "invalid";
    }
  };
  return {
    playRound: playRound,
    getCurrentPlayer: () => _getPlayerBySymbol(currentPlayer),
    resetGame: resetGame,
    setPlayers: setPlayers,
  };
})();

export {GameController};