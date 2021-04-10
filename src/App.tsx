import React from "react";
import { Chessboard } from "./components";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div id="app">
      <Chessboard />
    </div>
  );
};

export default App;
