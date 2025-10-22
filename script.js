let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

let currentPlayer = "X";
let isGameContinuing = true;

console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}`);

while (isGameContinuing == true) {
  let question = Number(
    prompt(`${currentPlayer}'s turn, write your choice from 1 to 9`)
  );
  while (
    Number.isNaN(question) ||
    question < 1 ||
    question > 9 ||
    board[question - 1] !== String(question)
  ) {
    console.log(`your choice must be a number of cell between 1 to 9`);
    question = Number(
      prompt(`${currentPlayer}'s turn, write your choice from 1 to 9`)
    );
  }

  board[question - 1] = currentPlayer;

  if (board[0] == board[1] && board[1] == board[2]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else if (board[3] == board[4] && board[4] == board[5]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else if (board[6] == board[7] && board[7] == board[8]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else if (board[0] == board[3] && board[3] == board[6]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else if (board[1] == board[4] && board[4] == board[7]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else if (board[2] == board[5] && board[5] == board[8]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else if (board[0] == board[4] && board[4] == board[8]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else if (board[2] == board[4] && board[4] == board[6]) {
    console.log(`Conglatulations ${currentPlayer}, you win!`);
    isGameContinuing = false;
  } else {
    isGameContinuing = false;
    for (const cell of board) {
      if (!isNaN(Number(cell))) {
        isGameContinuing = true;
        break;
      }
    }
    if (isGameContinuing == false) {
      console.log("It's a tie!");
    }
  }

  console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}`);
  switch (currentPlayer) {
    case "X":
      currentPlayer = "O";
      break;
    case "O":
      currentPlayer = "X";
      break;
  }
}
