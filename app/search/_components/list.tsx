"use client";
import { getPokemonList } from "@/app/_aux/pokemon_api";
import { Root } from "@/app/_interfaces/pokemon";
import { Progress } from "@/components/ui/progress";

import { ListItemComponent, ListItemPlaceholder } from "./list_item";
import * as React from "react";
export default function ListComponent(props: { items: Root[] }) {
  const list: Root[] = [];
  const [pokemons, setPokemons] = React.useState(list);
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
    console.log(props.items)
    setPokemons(props.items)
  }, [props.items])

  let placeholders: any[] = [];
  for (let i = 0; i < limit.current; i++) {
    placeholders.push({
      name: "",
      url: "",
    });
  }
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 items-center justify-items-center">
      {pokemons.length > 0 ? (
        pokemons.map((item, index) => <ListItemComponent pokemon={item} key={index} />)
      ) : (
        <ListItemPlaceholder count={limit.current} placeholders={placeholders} />
      )}
    </div>
  );
}
