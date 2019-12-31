import React from "react";
import PokemonContext from "./pokemon-context";

function Pokemon({ ...rest }) {
  let [
    {
      pokemon: { name }
    },
    dispatch
  ] = React.useContext(PokemonContext);
  return <h1 {...rest}>{name}</h1>;
}

export default Pokemon;
