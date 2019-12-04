import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Pokemon({ name, ...rest }) {
  return <h1 {...rest}>{name}</h1>;
}

function App() {
  return (
    <div>
      <Pokemon name="Bisasam" class="Whut" />
      <Pokemon name="Bisaknosp" id="23" />
      <Pokemon name="Bisaflor" data-something="nice" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
