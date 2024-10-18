"use client";
import { getPokemonList } from "@/app/_aux/pokemon_api";
import * as Pokemon from "@/app/_interfaces/pokemon";
import React, { lazy, memo, Suspense } from "react";
import { Card, CardFooter, CardHeader, Image, Link } from "@nextui-org/react";
import { Divider, CardBody } from "@nextui-org/react";
interface ListProps {
  items: Pokemon.Root[];
}

interface ItemProps {
  pokemon: Pokemon.Root;
}

function LoadingItem(): React.ReactElement {
  return (
    <Card className="max-w-[400px] m-6">
      <CardHeader className="flex gap-3">
        <Image alt="nextui logo" height={40} radius="sm" src={""} width={40} />
        <div className="flex flex-col">
          <p className="text-md text-xl">{""}</p>
          <p className="text-small text-default-500">nextui</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Pokemons is fun and colorful</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={""}>
          Visit detail page
        </Link>
      </CardFooter>
    </Card>
  );
}

const ItemComponent = memo(
  (props: ItemProps): React.ReactElement<ItemProps> => {
    const ListItemComponent = lazy(() => import("./item"));
    return (
      <Suspense fallback={<LoadingItem />}>
        <ListItemComponent item={props.pokemon} key={props.pokemon.id}/>
      </Suspense>
    );
  },
);

ItemComponent.displayName = "ItemComponet lsit";

export default function ListComponent(
  props: ListProps,
): React.ReactElement<ListProps> {
  const [pokemons, setPokemons] = React.useState<Pokemon.Root[]>([]);
  const limit = React.useRef(30);

  const offset = React.useRef(0);

  React.useEffect(() => {
    if (props.items.length == 0) {
     
      getPokemonList({
        limit: limit.current,
        offset: offset.current,
        tries: 6,
      }).then((response) => {
        setPokemons(response);
      });
    }
  }, []);

  React.useEffect(() => {
    setPokemons(props.items);
  }, [props.items]);

  if (pokemons.length == 0) {
    const inital = [];
    for (let index = 0; index < limit.current; index++) {
      inital.push(<LoadingItem key={index}/>);
    }
    return (
      <div className="grid lg:grid-cols-5 md:grid-cols-3 items-center justify-items-center">
        {inital}
      </div>
    );
  }

 
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 items-center justify-items-center">
      {pokemons.map((item, index) => (
        <ItemComponent pokemon={item} key={index} />
      ))}
    </div>
  );
}
