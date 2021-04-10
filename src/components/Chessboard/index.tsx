import React from "react";
import { Tile } from "..";
import "./Chessboard.scss";

const Chessboard: React.FC = () => {
  const va = [1, 2, 3, 4, 5, 6, 7, 8];
  const ha = ["a", "b", "c", "d", "e", "f", "g", "h"];

  let board = [];
  for (let i = va.length - 1; i >= 0; i--) {
    for (let j = 0; j < ha.length; j++) {
      board.push(<Tile number={j + i + 2} />);
    }
  }

  return <div id="chessboard">{board}</div>;
};

export default Chessboard;
