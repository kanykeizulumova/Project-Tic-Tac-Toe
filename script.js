let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

let currentPlayer = "X";
let isGameContinuing = true;

if ((isGameContinuing = true)) {
  console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}`);
}

let question = Number(
  prompt(`${currentPlayer}'s turn, write your choice from 1 to 9`)
);
while (Number.isNaN(question) || question < 1 || question > 9) {
  console.log(`your choice must be a number of cell between 1 to 9`);
  question = Number(
    prompt(`${currentPlayer}'s turn, write your choice from 1 to 9`)
  );
}
