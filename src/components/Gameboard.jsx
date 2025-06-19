import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      //   prevGameBoard[rowIndex][colIndex] = 'X'
      //   return prevGameBoard
      // Now we could do above, but I'm saying "could" because this approach is not recommended. Instead, just as you should use this state updating function when updating your state based on some previous state, it's also strongly recommended that if your state is an object or array, you update that state in an immutable way, which simply means you create a copy of the old state, so a new object or a new array first, and you then just change that copy instead of that existing object or array. And the reason for that recommendation is that if your state is an object or array you are dealing with a reference value in JavaScript. And therefore if you would be updating it like this you would be updating the old value in-memory immediately, even before this scheduled state update was executed by React. And this can again lead to strange bugs or side effects if you have multiple places in your application that are scheduling state updates for the same state.
      const updateGameBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updateGameBoard;
    });
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}