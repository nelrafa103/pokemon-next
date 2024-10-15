"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListComponent from "./_components/list";
import PaginationComponent from "./_components/pagination";
import * as React from 'react'
import { requestSearched } from "../_aux/pokemon_api";
import { Root } from "../_interfaces/pokemon";
import { Badge } from "@/components/ui/badge"
import { Response } from "../pokemon/route";

export default function Search() {

  const [value, setValue] = React.useState<string>("")
  const [pokemons, setPokemons] = React.useState<Root[]>([])
  async function handleChange() {
    const req = await fetch("/pokemon", {
      method: "POST",
      body: JSON.stringify(
        {
          param: value
        }
      )
    })
    const res: Response = await req.json()
    const coincides = []
    for (const item of res.resolved) {
      for (const where of res.tasks) {
        if (item.name == where.name) {
          coincides.push(where)
        }
      }
    }

    coincides.forEach((item) => {
     res.tasks = res.tasks.filter(elem => elem !== item)
    })

    const list = res.tasks.length != 0  ? await requestSearched(res.tasks): []
   
    const unified_list = list.concat(res.resolved)
    setPokemons(unified_list)
  }

  React.useEffect(() => {
  }, [pokemons])

  return (
    <>
      <div className="flex flex-col w-full items-center space-x-2 justify-center justify-items-center py-8">
        <div className="w-1/2 flex mb-8">
          <Input type="text" placeholder="Search a Pokemon" onChange={(item) => setValue(item.currentTarget.value)} />
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
