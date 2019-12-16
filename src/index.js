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

function List({
  as: As = React.Fragment,
  items,
  renderItem = item => <p>{item.name}</p>,
  ...rest
}) {
  return <As {...rest}>{items.map(renderItem)}</As>;
}

function PokemonList({
  renderItem = pokemon => <li key={pokemon.key}>{pokemon.name}</li>,
  ...props
}) {
  return <List {...props} renderItem={renderItem} />;
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
        <PokemonList
          as="div"
          items={collection.results}
          renderItem={pokemon => <button type="button">{pokemon.name}</button>}
        />
      ) : (
        <div>Fetching Pokemon</div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
