const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  const placeMark = (index, symbol) => {
    if (board[index] === "") {
      board[index] = symbol;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };
  const getBoard = () => {
    return board;
  };

  return {
    placeMark,
    resetBoard,
    getBoard,
  };
})();

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

const displayController = (function () {
  const boardDiv = document.querySelector(".board");
  const gameResult = document.querySelector(".gameResult");
  const warningDiv = document.querySelector(".warning");
  const playerName = document.querySelector(".playerName");
  boardDiv.addEventListener("click", (e) => {
    const clickedCell = e.target;
    let index = e.target.dataset.index;
    const roundStatus = GameController.playRound(index);
    if (roundStatus === "win") {
      renderBoard();
      let playerInfo = GameController.getCurrentPlayer();
      gameResult.textContent = `Conglatulations ${playerInfo.name}, you win!`;
      playerName.textContent = "";
    } else if (roundStatus === "tie") {
      renderBoard();
      gameResult.textContent = `It's a tie`;
    } else if (roundStatus === "continue") {
      renderBoard();
      let playerInfo = GameController.getCurrentPlayer();
      playerName.textContent = `${playerInfo.name}'s turn`;
    } else if (roundStatus === "invalid") {
      warningDiv.textContent = "Choose another cell";
    }
  });
  const renderBoard = () => {
    const board = Gameboard.getBoard();
    for (let i = 0; i < board.length; i++) {
      const selector = `[data-index="${i}"]`;
      const cellElement = boardDiv.querySelector(selector);
      cellElement.textContent = board[i];
    }
  };

  const resetButton = document.querySelector(".reset");
  const startButton = document.querySelector(".start");

  resetButton.addEventListener("click", () => {
    Gameboard.resetBoard();
    GameController.resetGame();
    renderBoard();
    gameResult.textContent = "";
    warningDiv.textContent = "";
    playerName.textContent = "";
  });

  startButton.addEventListener("click", function () {
    favDialog.showModal();
  });
  const cancelButton = document.getElementById("cancel");
  cancelButton.addEventListener("click", function () {
    favDialog.close();
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const playerInfo = document.getElementById("nameone");
    const playerInfo2 = document.getElementById("nametow");
    const symbolX = document.getElementById("symbolone");
    const symbolO = document.getElementById("symboltwo");
    const namePlayer1 = playerInfo.value;
    const namePlayer2 = playerInfo2.value;
    const symbolPlayer1 = symbolX.value;
    const symbolPlayer2 = symbolO.value;
    const player1 = createPlayer(namePlayer1, symbolPlayer1);
    const player2 = createPlayer(namePlayer2, symbolPlayer2);
    GameController.setPlayers(player1, player2);
    Gameboard.resetBoard();
    GameController.resetGame();
    renderBoard();
    gameResult.textContent = "";
    warningDiv.textContent = "";
    let startingPlayer = GameController.getCurrentPlayer();
    playerName.textContent = `${startingPlayer.name}'s turn`;
    favDialog.close();
  });

  return {};
})();

const createPlayer = (name, symbol) => {
  return {
    name: name,
    symbol: symbol,
  };
};
