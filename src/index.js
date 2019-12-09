import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const pokemons = [
  { name: "Bisasam" },
  { name: "Bisaknosp" },
  { name: "Bisaflor" }
];

function Pokemon({ name, ...rest }) {
  return <h1 {...rest}>{name}</h1>;
}

function App() {
  const [index, setIndex] = React.useState(0);
  let pokemon = pokemons[index];

  return (
    <div>
      <button type="button" onClick={() => setIndex(index + 1)}>
        Next
      </button>

      {pokemon ? (
        <Pokemon name={pokemons[index].name} />
      ) : (
        <div>No pokemon for index {index}</div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
