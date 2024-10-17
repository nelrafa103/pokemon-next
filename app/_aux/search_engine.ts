/* I'm goin to implement a system where certain data will be store in mongodb, data as name, url etc..
For faster searching on databases*/
// function search_engine() {}

/* Mover este codigo a pokemon service, agregar aqui codigo para trc*/

import { Mongo } from "../_services/mongo";
export async function recomendations(req: { param: string }) {
  const collection = await Mongo.pokemonsCollection();
  const pokemons = collection
    .find({
      name: { $regex: req.param, $options: "i" },
    })
    .toArray();

  return pokemons;
}
