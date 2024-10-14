"use client";
import * as React from "react";
import { Root } from "../_interfaces/pokemon";
import { Suspense } from "react";
import ListItemComponent from "./list_item";

import { Progress } from "@/components/ui/progress";
import { getPokemonList } from "../_aux/pokemon_api";
import { setTimeout } from "timers";
function ListComponent() {
  const list: Root[] = [];
  const documentRef = React.useRef(document);
  const [progress, setProgress] = React.useState(0);
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
  documentRef.current.addEventListener("scroll", handleScroll);
  const [pokemons, setPokemons] = React.useState(list);

  React.useEffect(() => {
    console.log(counter);
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
    <Suspense fallback={<Progress value={progress} className="w-[60%]" />}>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 items-center justify-items-center">
        {pokemons.length > 1 ? (
          pokemons.map((item, index) => <ListItemComponent pokemon={item} key={index} />)
        ) : (
          <Progress value={progress} className="w-[60%]" />
        )}
      </div>
    </Suspense>
  );
}

export default ListComponent;
