import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Pokemon({ name }) {
  return <h1>{name}</h1>;
}

function App() {
  return (
    <div>
      <Pokemon name="Bisasam" />
      <Pokemon name="Bisaknosp" />
      <Pokemon name="Bisaflor" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
