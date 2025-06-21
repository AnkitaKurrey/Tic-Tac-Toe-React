import GameBoard from './components/Gameboard';
import Player from './components/Player';
import Log from './components/Log';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning_combinations';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function dervivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activeplayer, setActivePlayer] = useState("X");

  const activePlayer = dervivedActivePlayer(gameTurns);
    let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS){
    const firstSqaureSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSqaureSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSqaureSymbol = gameBoard[combination[2].row][combination[2].column]
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = dervivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* Whenever you are using or reusing a component,React will basically create a new isolated instance. */}
          {/* So even though both players use the same player component, they work totally isolated from each other. */}
          {/* If the state in this first player component instance here changes, the second player component instance does not care about that at all. */}
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
