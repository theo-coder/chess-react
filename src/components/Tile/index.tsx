import React from "react";
import "./Tile.scss";

interface Props {
  number: number;
}

const Tile = ({ number }: Props) => {
  return <div className={number % 2 === 0 ? "tile btile" : "tile wtile"}></div>;
};

export default Tile;
