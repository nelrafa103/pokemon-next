"use client";
import React from "react";
import * as Pokemon from "@/app/_interfaces/pokemon";
import { getPokemonsbyUserEmail } from "../_aux/pokemon_api";
import { useCookies } from "react-cookie";
import ItemComponent from "../_components/item";
export default function CollectionPage() {
  const [pokemons, setPokemons] = React.useState<Pokemon.Root[]>([]);
  async function getAllPokemons(email: string) {
    const res = await getPokemonsbyUserEmail(email);
    return res;
  }
  const [cookies] = useCookies(["email"]);
  React.useEffect(() => {
    const email = cookies.email;
    getAllPokemons(email)
      .then((result) => {
        console.log(result)
        const list: Pokemon.Root[] = []
        result.map((item: Response) => list.push(item.pokemon))
        setPokemons(list)
    })
      .catch((error) => console.log(error));
  }, []);
  if (pokemons.length != 0) {
    return (
      <div className="grid lg:grid-cols-5 md:grid-cols-3 items-center justify-items-center">
        {pokemons.map((item) => (
          <ItemComponent key={item.id} pokemon={item} />
        ))}
      </div>
    );
  }
}


interface Response {
    email: string,
    pokemon: Pokemon.Root
}