"use client";
import * as React from "react";
import * as Pokemon from "@/app/_interfaces/pokemon";
import HeroComponent from "../_components/hero";
import { getPokemonDetails } from "@/app/_aux/pokemon_api";
import ListComponent from "../_components/list";

const initial: Pokemon.Root = {
  abilities: [],
  base_experience: 0,
  cries: {
    latest: "",
    legacy: "",
  },
  forms: [],
  game_indices: [],
  height: 0,
  held_items: [],
  id: 0,
  is_default: false,
  location_area_encounters: "",
  moves: [],
  name: "",
  order: 0,
  past_abilities: [],
  past_types: [],
  species: {
    name: "",
    url: "",
  },
  sprites: {
    back_default: "",
    back_female: undefined,
    back_shiny: "",
    back_shiny_female: undefined,
    front_default: "",
    front_female: undefined,
    front_shiny: "",
    front_shiny_female: undefined,
    other: {
      dream_world: {
        front_default: "",
        front_female: undefined,
      },
      home: {
        front_default: "",
        front_female: undefined,
        front_shiny: "",
        front_shiny_female: undefined,
      },
      "official-artwork": {
        front_default: "",
        front_shiny: "",
      },
      showdown: {
        back_default: "",
        back_female: undefined,
        back_shiny: "",
        back_shiny_female: undefined,
        front_default: "",
        front_female: undefined,
        front_shiny: "",
        front_shiny_female: undefined,
      },
    },
  },
  stats: [],
  types: [],
  weight: 0,
};

export default function Details({ params }: { params: { id: number } }) {
  const [details, setDetails] = React.useState<Pokemon.Root>(initial);
  React.useEffect(() => {
    getPokemonDetails({ id: params.id, tries: 5 }).then((res) =>
      setDetails(res),
    );
  }, []);

  return (
    <>
      <HeroComponent
        src={details.sprites.other["official-artwork"].front_default}
        alt={details.name}
        name={details.name}
        key={"Detailed Heroe"}
      />
      <ListComponent abilities={details.abilities} />
    </>
  );
}
