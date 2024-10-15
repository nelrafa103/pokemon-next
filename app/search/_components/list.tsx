"use client";
import { getPokemonList } from "@/app/_aux/pokemon_api";
import * as Pokemon from "@/app/_interfaces/pokemon";
import { ItemComponent } from "./item";
import * as React from "react";
export default function ListComponent(props: { items: Pokemon.Root[] }) {
 
  const [pokemons, setPokemons] = React.useState<Pokemon.Root[]>([]);
  const limit = React.useRef(30);
  const [progress, setProgress] = React.useState(2);


  const offset = React.useRef(0);

  React.useEffect(() => {
    if (props.items.length == 0) {
      getPokemonList({ limit: limit.current, offset: offset.current, tries: 6 }).then(
        (response) => {
          setProgress(progress + 1);
          setPokemons(response);
        },
      ); 
    } 
  }, []);



  React.useEffect(() => {
    setPokemons(props.items)
  }, [props.items])



  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 items-center justify-items-center">
      {
        pokemons.map((item, index) => <ItemComponent pokemon={item} key={index} />)
      }
    </div>
  );
}
