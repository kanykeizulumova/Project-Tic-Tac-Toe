let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameContinuing = true;
const boardDiv = document.querySelector(".board");
const playerName = document.querySelector(".playerName");
const warningDiv = document.querySelector(".warning");
const gameResult = document.querySelector(".gameResult");
playerName.textContent = `${currentPlayer}'s turn`;

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
        gameResult.textContent = `Conglatulations ${currentPlayer}, you win!`;
        isGameContinuing = false;
      }
    }
    if (board.every((cell) => cell !== "")) {
      gameResult.textContent = `It's a tie`;
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
    playerName.textContent = `${currentPlayer}'s turn`;
  }

  renderBoard();
});

//

//

//

//

/*




*/
console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}`);
