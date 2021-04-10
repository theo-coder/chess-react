import React from "react";
import "./Chessboard.scss";

const Chessboard = () => {
  const va = [1, 2, 3, 4, 5, 6, 7, 8];
  const ha = ["a", "b", "c", "d", "e", "f", "g", "h"];

  let board = [];
  for (let i = va.length - 1; i >= 0; i--) {
    for (let j = 0; j < ha.length; j++) {
      const nb = j + i + 2;
      board.push(
        <div className={nb % 2 === 0 ? "tile btile" : "tile wtile"}>
          [{ha[j]}
          {va[i]}]
        </div>
      );
    }
  }

  return <div id="chessboard">{board}</div>;
};

export default Chessboard;
