"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListComponent from "./_components/list";
import PaginationComponent from "./_components/pagination";
import React from "react";
import { requestSearch } from "../_aux/pokemon_api";
import { Root } from "../_interfaces/pokemon";
import { Badge } from "@/components/ui/badge";
import LoadingPage from "../pokemon/details/[id]/loading";

export default function Search(): React.ReactElement {
  const [value, setValue] = React.useState<string>("");
  const [pokemons, setPokemons] = React.useState<Root[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  async function handleChange() {
    setLoading(true);
    const results = await requestSearch(value);
    setLoading(false);
    setPokemons(results);
  }

  React.useEffect(() => {}, [pokemons]);

  if (isLoading == true) {
    return (
      <div className="flex flex-col w-full items-center space-x-2 justify-center justify-items-center py-8">
        <div className="w-1/2 flex mb-8">
          <Input
            type="text"
            placeholder="Search a Pokemon"
            onChange={(item) => setValue(item.currentTarget.value)}
          />
          <Button className="mx-4" onClick={() => handleChange()}>
            Search
          </Button>
          <Badge className="w-32" key={pokemons.length}>
            {`Result: ${pokemons.length}`}
          </Badge>
        </div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full items-center space-x-2 justify-center justify-items-center py-8">
        <div className="w-1/2 flex mb-8">
          <Input
            type="text"
            placeholder="Search a Pokemon"
            onChange={(item) => setValue(item.currentTarget.value)}
          />
          <Button className="mx-4" onClick={() => handleChange()}>
            Search
          </Button>
          <Badge className="w-32" key={pokemons.length}>
            {`Result: ${pokemons.length}`}
          </Badge>
        </div>
        <ListComponent items={pokemons} key={pokemons.length} />
        <PaginationComponent key={"Pagination bottom"} />
      </div>
    </>
  );
}
