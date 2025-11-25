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

export {Gameboard};

const createPlayer = (name, symbol) => {
  return {
    name: name,
    symbol: symbol,
  };
};
 export {createPlayer};