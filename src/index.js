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

async function getJson(url) {
  let res = await fetch(url);
  if (res.ok) {
    let json = await res.json();
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
  className,
  ...props
}) {
  return (
    <List
      className={["PokemonList", className].join(" ")}
      {...props}
      renderItem={renderItem}
    />
  );
}

function App() {
  const [{ pokemon, ...state }, dispatch] = React.useReducer(
    (state, action) => {
      if (action.type === "fetch_and_replace_pokemon") {
        getJson(action.payload).then(json =>
          dispatch({
            type: "replace_pokemon",
            payload: json
          })
        );
        return state;
      }
      if (action.type === "replace_pokemon")
        return { ...state, pokemon: action.payload };
      throw new Error();
    },
    { pokemon: null }
  );
  const collection = usePokemon("");

  return (
    <div>
      {pokemon ? <Pokemon name={pokemon.name} /> : <div>Select Pokemon</div>}

      {collection ? (
        <PokemonList
          as="div"
          items={collection.results}
          renderItem={pokemon => (
            <div>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "fetch_and_replace_pokemon",
                    payload: pokemon.url
                  })
                }
              >
                {pokemon.name}
              </button>
            </div>
          )}
        />
      ) : (
        <div>Fetching Pokemon</div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
