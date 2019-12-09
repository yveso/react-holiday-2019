import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const pokemons = [
  { name: "Bisasam" },
  { name: "Bisaknosp" },
  { name: "Bisaflor" }
];

async function fetchPokemon(id = "") {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject();
  }
}

function Pokemon({ name, ...rest }) {
  return <h1 {...rest}>{name}</h1>;
}

function App() {
  const [index, setIndex] = React.useState(0);
  let pokemon = pokemons[index];

  React.useEffect(() => {
    fetchPokemon(index).then(json => console.log(json));
  });

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
