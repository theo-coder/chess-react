import React, { useState, useRef } from "react";
import { Tile } from "..";
import "./Chessboard.scss";
import Referee from "../referee/Referee";

const va = [1, 2, 3, 4, 5, 6, 7, 8];
const ha = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

export enum TeamType {
  OUR,
  OPPONENT,
}

const initialBoardState: Piece[] = [];
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/images/pieces/pawn_b.png",
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPPONENT,
  });
}
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/images/pieces/pawn_w.png",
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.OUR,
  });
}
for (let i = 0; i < 2; i++) {
  const team = i === 0 ? TeamType.OPPONENT : TeamType.OUR;
  const type = team === TeamType.OPPONENT ? "b" : "w";
  const y = team === TeamType.OPPONENT ? 7 : 0;

  initialBoardState.push({
    image: `assets/images/pieces/rook_${type}.png`,
    x: 0,
    y,
    type: PieceType.ROOK,
    team,
  });
  initialBoardState.push({
    image: `assets/images/pieces/rook_${type}.png`,
    x: 7,
    y,
    type: PieceType.ROOK,
    team,
  });
  initialBoardState.push({
    image: `assets/images/pieces/knight_${type}.png`,
    x: 1,
    y,
    type: PieceType.KNIGHT,
    team,
  });
  initialBoardState.push({
    image: `assets/images/pieces/knight_${type}.png`,
    x: 6,
    y,
    type: PieceType.KNIGHT,
    team,
  });
  initialBoardState.push({
    image: `assets/images/pieces/bishop_${type}.png`,
    x: 2,
    y,
    type: PieceType.BISHOP,
    team,
  });
  initialBoardState.push({
    image: `assets/images/pieces/bishop_${type}.png`,
    x: 5,
    y,
    type: PieceType.BISHOP,
    team,
  });
  initialBoardState.push({
    image: `assets/images/pieces/queen_${type}.png`,
    x: 3,
    y,
    type: PieceType.QUEEN,
    team,
  });
  initialBoardState.push({
    image: `assets/images/pieces/king_${type}.png`,
    x: 4,
    y,
    type: PieceType.KING,
    team,
  });
}

const Chessboard: React.FC = () => {
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [activePiece, setActivePiece] = useState<HTMLElement>();
  const referee = new Referee();

  const chessboardRef = useRef<HTMLDivElement>(null);

  let board = [];
  const grabPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    const el = e.target as HTMLElement;
    if (el.classList.contains("piece-image") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );

      el.style.position = "absolute";
      el.style.left = `${e.clientX - 50}px`;
      el.style.top = `${e.clientY - 50}px`;

      setActivePiece(el);
    }
  };
  const movePiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      activePiece.style.left =
        x < minX ? `${minX}px` : x > maxX ? `${maxX}px` : `${x}px`;
      activePiece.style.top =
        y < minY ? `${minY}px` : y > maxY ? `${maxY}px` : `${y}px`;
    }
  };
  const releasePiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      setPieces((value) => {
        return value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            if (
              referee.isValidMove(gridX, gridY, x, y, p.type, p.team, value)
            ) {
              p.x = x;
              p.y = y;
            } else {
              activePiece!.style.position = "relative";
              activePiece!.style.removeProperty("left");
              activePiece!.style.removeProperty("top");
            }
          }
          return p;
        });
      });
      setActivePiece(undefined);
    }
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
      ref={chessboardRef}
    >
      {board}
    </div>
  );
};

export default Chessboard;
