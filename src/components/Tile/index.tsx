import React from "react";
import "./Tile.scss";

interface Props {
  image?: string;
  number: number;
}

const Tile = ({ number, image }: Props) => {
  return number % 2 === 0 ? (
    <div className="tile btile">
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="piece-image"
        ></div>
      )}
    </div>
  ) : (
    <div className="tile wtile">
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="piece-image"
        ></div>
      )}
    </div>
  );
};

export default Tile;
