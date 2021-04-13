import React, { useState, useRef } from "react";
import { Tile } from "..";
import "./Chessboard.scss";
import Referee from "../referee/Referee";
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  Piece,
  TeamType,
  PieceType,
  initialBoardState,
  Position,
  samePosition,
} from "../config/Constants";

const Chessboard: React.FC = () => {
  const [grabPostion, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const referee = new Referee();

  const chessboardRef = useRef<HTMLDivElement>(null);

  const grabPiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    const el = e.target as HTMLElement;

    if (el.classList.contains("piece-image") && chessboard) {
      setGrabPosition({
        x: Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE),
        y: Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
        ),
      });

      el.style.position = "absolute";
      el.style.left = `${e.clientX - GRID_SIZE / 2}px`;
      el.style.top = `${e.clientY - GRID_SIZE / 2}px`;

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
      activePiece.style.position = "absolute";

      activePiece.style.left =
        x < minX ? `${minX}px` : x > maxX ? `${maxX}px` : `${x}px`;
      activePiece.style.top =
        y < minY ? `${minY}px` : y > maxY ? `${maxY}px` : `${y}px`;
    }
  };
  const releasePiece = (e: React.MouseEvent) => {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPostion)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPostion,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPostion,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPostion)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        } else if (validMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPostion)) {
              piece.enPassant =
                Math.abs(grabPostion.y - y) === 2 &&
                piece.type === PieceType.PAWN;

              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  };

  let board = [];

  for (let i = VERTICAL_AXIS.length - 1; i >= 0; i--) {
    for (let j = 0; j < HORIZONTAL_AXIS.length; j++) {
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: j, y: i })
      );
      const image = piece ? piece.image : undefined;

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
