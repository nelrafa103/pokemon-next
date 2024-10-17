"use client";
import React from "react";
import * as Pokemon from "../_interfaces/pokemon";

import { getPokemonList } from "../_aux/pokemon_api";
import { setTimeout } from "timers";

import { Card } from "@/components/ui/card";

const PokemonItem = React.memo(({ pokemon }: { pokemon: Pokemon.Root }) => {
  const ListItemComponent = React.lazy(() => import("./item"));

  return (
    <React.Suspense fallback={<LoadinItem />}>
      <ListItemComponent key={pokemon.id} pokemon={pokemon} />
    </React.Suspense>
  );
});

PokemonItem.displayName = "PokemonItem";

function LoadinItem() {
  return (
    <Card className="mb-4 w-10/12 mx-5 h-60 hover:bg-gray-300 hover:cursor-pointer">
      <div className="flex flex-col items-center justify-center w-full dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 text-center">
          <div className="spinner mx-auto mb-4"> </div>
        </div>
      </div>
    </Card>
  );
}

export default function ListComponent(): React.ReactElement {
  const [counter, setCounter] = React.useState(0);
  const limit = 10;
  const offset = React.useRef(0);

  function handleScroll(event: Event) {
    event.preventDefault();
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
      {pokemons.map((item, index) => (
        <PokemonItem pokemon={item} key={index} />
      ))}
    </div>
  );
}
