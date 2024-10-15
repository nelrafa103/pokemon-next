"use client";
import * as React from "react";
import * as Pokemon from "../_interfaces/pokemon";
import ListItemComponent from "./item";

import { getPokemonList } from "../_aux/pokemon_api";
import { setTimeout } from "timers";
export default function ListComponent(): React.ReactElement {

  const [counter, setCounter] = React.useState(0);
  const limit = 10;
  const offset = React.useRef(0);

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight) {
      setCounter(counter + 1);
    }
  }
  if (typeof document != "undefined") {
    document.addEventListener("scroll", handleScroll);
  }
  const [pokemons, setPokemons] = React.useState<Pokemon.Root[]>([]);

  React.useEffect(() => {
    getPokemonList({ limit: limit, offset: offset.current, tries: 6 }).then(
      (res) => setPokemons(pokemons.concat(res)),
    );
    if (offset.current < 30) {
      setTimeout(() => {
        offset.current = offset.current + 10;
      }, 100);
    } else if (offset.current >= 30 && counter != 0) {
      offset.current = offset.current + 10;
      setCounter(0);
    }
  }, [offset.current, counter]);

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 items-center justify-items-center">
      {
        pokemons.map((item, index) => <ListItemComponent pokemon={item} key={index} />)
      }
    </div>
  );
}

