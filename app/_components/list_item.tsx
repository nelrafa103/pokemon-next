import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Image from "next/image";
import { Root } from "../_interfaces/pokemon";
import { useRouter } from "next/navigation";

function ListItemComponent(props: { pokemon: Root }) {
  const router = useRouter();

  function handleClick(param: number) {
    router.push(`/details/${param}`);
  }

  const capitalized_name =
    props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1);
  return (
    <Card
      className="mb-4 w-10/12 mx-5 h-60 hover:bg-gray-300 hover:cursor-pointer"
      onClick={() => handleClick(props.pokemon.id)}
    >
      <CardHeader>
        <CardTitle>
          <Image
            src={props.pokemon.sprites.front_default}
            alt="front default"
            width={64}
            height={64}
          />
          {capitalized_name}
        </CardTitle>
        <CardContent>
          <ul>
            {props.pokemon.abilities.map((item) => (
              <li key={item.slot}>{item.ability.name}</li>
            ))}
          </ul>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
export default ListItemComponent;
