import React from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./error-boundary";
import { getJson, fetchPokemon } from "./data";
import List from "./list";
import PokemonContext from "./pokemon-context";
import "./styles.css";

const Pokemon = React.lazy(() => import("./pokemon"));

function usePokemon(index) {
  const [pokemon, setPokemon] = React.useState(null);

  React.useEffect(() => {
    fetchPokemon(index).then(json => setPokemon(json));
  }, [index]);

  return pokemon;
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
  const stateReducer = React.useReducer(
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
      throw new Error(`${action.type} unknown`);
    },
    { pokemon: null }
  );
  const [{ pokemon }, dispatch] = stateReducer;
  const collection = usePokemon("");

  return (
    <div>
      {pokemon ? (
        <PokemonContext.Provider value={stateReducer}>
          <React.Suspense fallback="...loading...">
            <Pokemon />
          </React.Suspense>
        </PokemonContext.Provider>
      ) : (
        <div>Select Pokemon</div>
      )}

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
ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  rootElement
);
