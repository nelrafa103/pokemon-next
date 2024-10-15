"use client";
import * as React from "react";
import * as Pokemon from "@/app/_interfaces/pokemon";
import HeroComponent from "../_components/hero";
import { getPokemonDetails } from "@/app/_aux/pokemon_api";
import ListComponent from "../_components/list";

interface DetailsProps {
  id: number
}
export default function Details(props: DetailsProps): React.ReactElement<DetailsProps> {
  const [details, setDetails] = React.useState<Pokemon.Root>();
  React.useEffect(() => {
    getPokemonDetails({ id: props.id, tries: 5 }).then((res) =>
      setDetails(res),
    );
  }, []);
  const spriteSrc = details?.sprites?.other["official-artwork"].front_default || '';
  const name = details?.name || 'No available';
  const abilities = details?.abilities || [];
  return (
    <>
      <HeroComponent
        src={spriteSrc}
        alt={name}
        name={name}
        key={"Detailed Heroe"}
      />
      <ListComponent abilities={abilities} />
    </>
  );
}
