import { PieceType, TeamType, Piece } from "../Chessboard";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    console.log("referee check");
    console.log(`prev loc: ${px},${py}`);
    console.log(`current loc: ${x},${y}`);
    console.log(`type: ${type}`);
    console.log(`team: ${team}`);

    switch (type) {
      case PieceType.PAWN:
        const twoMovesRow = team === TeamType.OUR ? 1 : 6;
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (px === x && py === twoMovesRow && y - py === 2 * pawnDirection) {
          if (
            !this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupied(x, y - pawnDirection, boardState)
          ) {
            return true;
          }
        } else if (px === x && y - py === pawnDirection) {
          if (!this.tileIsOccupied(x, y, boardState)) {
            return true;
          }
        }

        break;
      default:
        console.log("piece not in switch");
        break;
    }
    return false;
  }
}
