export async function fetchPokemon(id = "") {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (res.ok) {
    const json = await res.json();
    // console.log(json);
    return json;
  } else {
    return Promise.reject();
  }
}

export async function getJson(url) {
  let res = await fetch(url);
  if (res.ok) {
    let json = await res.json();
    return json;
  } else {
    return Promise.reject();
  }
}
