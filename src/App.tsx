import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { SquareValueProps } from "./interfaces";
import { getInitialData } from "./helpers/methods/getInitialData";
import { NONE } from "./helpers/constant";
import { postMove } from "./helpers/methods/postMove";
import { newGame } from "./helpers/methods/newGame";
import Square from "./components/Square";

function App() {
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string>(NONE);
  const [squares, setSquares] = useState<SquareValueProps[]>();

  const isGameStarted =
    squares?.filter((item) => item.value !== "").length !== 0;

  useEffect(() => {
    const hasNoDefaultData = isEmpty(squares);
    if (hasNoDefaultData) {
      /* http request to get 
      the initial/default data value from the server */
      getInitialData().then((res) => {
        handleData(res);
      });
    }
  }, [squares]);

  const handleSquareClick = (
    e: React.MouseEvent,
    id: number,
    player: string
  ) => {
    e.preventDefault();

    if (winner !== NONE) {
      return;
    }

    postMove(id, player).then((res) => {
      handleData(res);
    });
  };

  const handleNewgameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isGameStarted) {
      newGame().then((res) => {
        handleData(res);
      });
    }
  };

  const handleData = ({
    data,
    player,
    winner,
  }: {
    data: SquareValueProps[];
    player: string;
    winner?: string;
  }) => {
    setSquares(data);
    setPlayer(player);
    if (winner) {
      setWinner(winner);
    } else {
      setWinner(NONE);
    }
  };

  return (
    <div className="tic-tac-toe-container">
      <div className="title">
        <div className="tic">
          <span className="t">T</span>ic
        </div>
        <div className="tac">
          <span className="t">T</span>ac
        </div>
        <div className="toe">
          <span className="t">T</span>oe
        </div>
      </div>
      <h1>Tic Tac Toe</h1>
      {winner === NONE && (
        <h3 className="text-next-player">
          Next Player: <span>{player}</span>
        </h3>
      )}
      {winner !== NONE && (
        <h3 className="text-winner">
          Winner: <span>{winner}</span>
        </h3>
      )}

      <button
        className="btn-reset"
        onClick={handleNewgameClick}
        disabled={!isGameStarted}
      >
        New Game
      </button>

      <div className="square-container">
        {squares?.map((item) => (
          <div key={item.id}>
            <Square
              id={item.id}
              value={item.value}
              player={player}
              onClickSquare={handleSquareClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
