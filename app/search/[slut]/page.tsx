"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListComponent from "../_components/list";
import PaginationComponent from "../_components/pagination";
import React from "react";
import { requestSearch } from "../../_aux/pokemon_api";
import { Root } from "../../_interfaces/pokemon";
import { Badge } from "@/components/ui/badge";
import LoadingPage from "../../details/[id]/loading";
import { usePathname } from "next/navigation";

export default function Search(): React.ReactElement {
  const path = usePathname()
  
  function getLastSegment(url: string) {
    // Divide la URL por cada '/' y obtiene el último segmento
    const segments = url.split('/');
    
    // Retorna el último segmento que no sea vacío
    return segments.pop() || segments.pop();  // Para manejar caso donde la URL termine en '/'
  }


  const [value, setValue] = React.useState<string>(getLastSegment(path)!);
  const [pokemons, setPokemons] = React.useState<Root[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [pages, setPages] = React.useState<Array<Root[]>>([]);
  const [index, setIndex] = React.useState<number>(1);
  const limit = 30;
  async function handleChange() {
    setLoading(true);
    const results = await requestSearch(value);
    const pages = paginate(results, limit);
    setPages(pages);
    setLoading(false);
    setPokemons(pages[0]);
  }

  function execute(num: number) {
    setIndex(num);
    setPokemons(pages[index]);
  }
  React.useEffect(() => {}, [pokemons]);

  console.log(path)
  if (isLoading == true) {
    return (
      <div className="flex flex-col w-full items-center space-x-2 justify-center justify-items-center py-8">
        <div className="w-1/2 flex mb-8">
          <Input
            type="text"
            placeholder="Search a Pokemon"
            value={value}
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
            value={value}
            onChange={(item) => setValue(item.currentTarget.value)}
          />
          <Button className="mx-4" onClick={() => handleChange()}>
            Search
          </Button>
          {pokemons != undefined ? (
            <Badge className="w-32" key={pokemons.length}>
              {`Result: ${pokemons.length}`}
            </Badge>
          ) : (
            <></>
          )}
        </div>
        {pokemons != undefined ? (
          <ListComponent items={pokemons} key={pokemons.length} />
        ) : (
          <></>
        )}

        <PaginationComponent
          key={"Pagination bottom"}
          onClick={execute}
          total={10}
        />
      </div>
    </>
  );
}

function paginate(arr: Root[], size: number) {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    result.push(chunk);
  }

  return result;
}
