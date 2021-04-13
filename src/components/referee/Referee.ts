import { PieceType, TeamType, Piece, Position } from "../config/Constants";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }
  tileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  }
  isEnPassantMove(
    previousPosition: Position,
    nextPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const pawnDirection = team === TeamType.OUR ? 1 : -1;
    if (type === PieceType.PAWN) {
      if (
        (nextPosition.x - previousPosition.x === -1 ||
          nextPosition.x - previousPosition.x === 1) &&
        nextPosition.y - previousPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === nextPosition.x &&
            p.position.y === nextPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }
    return false;
  }
  isValidMove(
    previousPosition: Position,
    nextPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    switch (type) {
      case PieceType.PAWN:
        const twoMovesRow = team === TeamType.OUR ? 1 : 6;
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (
          previousPosition.x === nextPosition.x &&
          previousPosition.y === twoMovesRow &&
          nextPosition.y - previousPosition.y === 2 * pawnDirection
        ) {
          if (
            !this.tileIsOccupied(nextPosition.x, nextPosition.y, boardState) &&
            !this.tileIsOccupied(
              nextPosition.x,
              nextPosition.y - pawnDirection,
              boardState
            )
          ) {
            return true;
          }
        } else if (
          previousPosition.x === nextPosition.x &&
          nextPosition.y - previousPosition.y === pawnDirection
        ) {
          if (
            !this.tileIsOccupied(nextPosition.x, nextPosition.y, boardState)
          ) {
            return true;
          }
        } else if (
          nextPosition.x - previousPosition.x === -1 &&
          nextPosition.y - previousPosition.y === pawnDirection
        ) {
          console.log("upper / bottom left");
          if (
            this.tileIsOccupiedByOpponent(
              nextPosition.x,
              nextPosition.y,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else if (
          nextPosition.x - previousPosition.x === 1 &&
          nextPosition.y - previousPosition.y === pawnDirection
        ) {
          console.log("upper / bottom right");
          if (
            this.tileIsOccupiedByOpponent(
              nextPosition.x,
              nextPosition.y,
              boardState,
              team
            )
          ) {
            return true;
          }
        }
        return false;
      default:
        console.log("piece not in switch");
        break;
    }
    return false;
  }
}
