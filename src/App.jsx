import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import { useState } from "react";
function App() {
  const [activeplayer, setActivePlayer] = useState("X");

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
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
            isActive={activeplayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activeplayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activeplayer}
        />
      </div>
    </main>
  );
}

export default App;
