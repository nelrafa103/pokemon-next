"use client";
import React from "react";
import * as Ability from "@/app/_interfaces/ability";
import * as Pokemon from "@/app/_interfaces/pokemon";
import { getPokemonAbilities } from "@/app/_aux/pokemon_api";
import ItemComponent from "./item";
interface ListProps {
  abilities: Pokemon.Ability[];
}
export default function ListComponent(
  props: ListProps,
): React.ReactElement<ListProps> {
  const [abilities, setAbilities] = React.useState<Ability.Root[]>([]);
  React.useEffect(() => {
    if (abilities.length == 0)
      getPokemonAbilities({ list: props.abilities, tries: 3 })
        .then((value) => setAbilities(value))
        .catch(() => {});
  }, [abilities]);

  return (
    <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 items-center justify-items-center h-96 my-8">
      {abilities.length > 0 ? (
        abilities.map((item, index) => (
          <ItemComponent abilty={item} key={index} />
        ))
      ) : (
        <> </>
      )}
    </div>
  );
}
