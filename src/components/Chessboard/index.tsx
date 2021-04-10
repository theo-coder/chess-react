import React, { useState } from "react";
import { Tile } from "..";
import "./Chessboard.scss";

const va = [1, 2, 3, 4, 5, 6, 7, 8];
const ha = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "assets/images/pieces/pawn_b.png",
    x: i,
    y: 6,
  });
}
for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "assets/images/pieces/pawn_w.png",
    x: i,
    y: 1,
  });
}
for (let i = 0; i < 2; i++) {
  const type = i === 0 ? "b" : "w";
  const y = i === 0 ? 7 : 0;

  pieces.push({ image: `assets/images/pieces/rook_${type}.png`, x: 0, y });
  pieces.push({ image: `assets/images/pieces/rook_${type}.png`, x: 7, y });
  pieces.push({ image: `assets/images/pieces/knight_${type}.png`, x: 1, y });
  pieces.push({ image: `assets/images/pieces/knight_${type}.png`, x: 6, y });
  pieces.push({ image: `assets/images/pieces/bishop_${type}.png`, x: 2, y });
  pieces.push({ image: `assets/images/pieces/bishop_${type}.png`, x: 5, y });
  pieces.push({ image: `assets/images/pieces/queen_${type}.png`, x: 3, y });
  pieces.push({ image: `assets/images/pieces/king_${type}.png`, x: 4, y });
}

const Chessboard: React.FC = () => {
  const [activePiece, setActivePiece] = useState<HTMLElement>();
  let board = [];
  const grabPiece = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.classList.contains("piece-image")) {
      el.style.position = "absolute";
      el.style.left = `${e.clientX - 50}px`;
      el.style.top = `${e.clientY - 50}px`;

      setActivePiece(el);
    }
  };
  const movePiece = (e: React.MouseEvent) => {
    if (activePiece) {
      activePiece.style.left = `${e.clientX - 50}px`;
      activePiece.style.top = `${e.clientY - 50}px`;
    }
  };
  const releasePiece = (e: React.MouseEvent) => {
    setActivePiece(undefined);
  };
  for (let i = va.length - 1; i >= 0; i--) {
    for (let j = 0; j < ha.length; j++) {
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === j && p.y === i) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${i}${j}`} image={image} number={j + i + 2} />);
    }
  }

  return (
    <div
      onMouseMove={movePiece}
      onMouseDown={grabPiece}
      onMouseUp={releasePiece}
      id="chessboard"
    >
      {board}
    </div>
  );
};

export default Chessboard;
