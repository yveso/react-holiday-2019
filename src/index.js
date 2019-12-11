import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

async function fetchPokemon(id = "") {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (res.ok) {
    const json = await res.json();
    // console.log(json);
    return json;
  } else {
    return Promise.reject();
  }
}

function usePokemon(index) {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    fetchPokemon(index).then(json => setPokemon(json));
  }, [index]);

  return pokemon;
}

function Pokemon({ name, ...rest }) {
  return <h1 {...rest}>{name}</h1>;
}

function PokemonList({ as: As, items, ...rest }) {
  return (
    <As {...rest}>
      {items.map(pokemon => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </As>
  );
}

function App() {
  const [index, setIndex] = React.useState(0);
  const pokemon = usePokemon(index);
  const collection = usePokemon("");

  return (
    <div>
      <button type="button" onClick={() => setIndex(index + 1)}>
        Next
      </button>

      {pokemon ? (
        <Pokemon name={pokemon.name} />
      ) : (
        <div>No pokemon for index {index}</div>
      )}

      {collection ? (
        <PokemonList as="ol" items={collection.results} />
      ) : (
        <div>Fetching Pokemon</div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
