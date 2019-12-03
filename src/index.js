import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Pokemon() {
  return <h1>Bulbasaur</h1>;
}

function App() {
  return (
    <div>
      <Pokemon />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
