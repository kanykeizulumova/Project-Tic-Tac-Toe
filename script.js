let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameContinuing = true;
let playerX = {
  name: "",
  symbol: "X",
};
let playerO = {
  name: "",
  symbol: "O",
};

function getCurrentPlayerObject() {
  if (currentPlayer === "X") {
    return playerX;
  } else {
    return playerO;
  }
}
const boardDiv = document.querySelector(".board");
const playerName = document.querySelector(".playerName");
const warningDiv = document.querySelector(".warning");
const gameResult = document.querySelector(".gameResult");
const resetButton = document.querySelector(".reset");
const startButton = document.querySelector(".start");
const divReset = document.querySelector(".resetGame");

function renderBoard() {
  for (let i = 0; i < board.length; i++) {
    const playerMove = board[i];
    const selector = `[data-index="${i}"]`;
    const cellElement = boardDiv.querySelector(selector);
    cellElement.textContent = playerMove;
  }
}
renderBoard();

boardDiv.addEventListener("click", (e) => {
  const clickedCell = e.target;
  let index = e.target.dataset.index;
  if (board[index] === "" && isGameContinuing) {
    board[index] = currentPlayer;
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
      if (board[a] == board[b] && board[b] == board[c] && board[a] !== "") {
        playerName.textContent = "";
        gameResult.textContent = `Conglatulations ${
          getCurrentPlayerObject().name
        }, you win!`;
        isGameContinuing = false;
      }
    }
    if (board.every((cell) => cell !== "")) {
      gameResult.textContent = `It's a tie`;
      playerName.textContent = "";
      isGameContinuing = false;
    }

    if (isGameContinuing === true) {
      switch (currentPlayer) {
        case "X":
          currentPlayer = "O";
          break;
        case "O":
          currentPlayer = "X";
          break;
      }
    }
  } else {
    warningDiv.textContent = "Choose another cell";
  }
  if (isGameContinuing) {
    playerName.textContent = `${getCurrentPlayerObject().name}'s turn`;
  }

  renderBoard();
});

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameContinuing = true;
  gameResult.textContent = "";
  warningDiv.textContent = "";
  playerName.textContent = `${playerX.name}'s turn`;
  renderBoard();
}
resetButton.addEventListener("click", resetGame);
resetGame();

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
  if (
    symbolPlayer1 === "" ||
    symbolPlayer2 === "" ||
    symbolPlayer1 === symbolPlayer2
  ) {
    warningDiv.textContent = "Choose different symbols!";
    return;
  }
  if (symbolPlayer1 === symbolX.value) {
    playerX.name = namePlayer1;
    playerO.name = namePlayer2;
  } else {
    playerX.name = namePlayer2;
    playerO.name = namePlayer1;
  }
  playerX.name = namePlayer1;
  playerO.name = namePlayer2;
  playerX.symbol = symbolPlayer1;
  playerO.symbol = symbolPlayer2;
  favDialog.close();
  resetGame();
});
