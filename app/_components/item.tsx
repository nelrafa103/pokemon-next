import React from "react";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { Root } from "../_interfaces/pokemon";
import { useRouter } from "next/navigation";
import { toUpperCase } from "../_aux/utils";

interface ItemProps {
  pokemon: Root;
}

function ItemComponent(props: ItemProps): React.ReactElement<ItemProps> {
  const router = useRouter();

  function handleClick(param: number) {
    console.log("hello world");
    router.push(`/details/${param}`);
  }

  return (
    <div className="mb-4 w-10/12 mx-5 h-60" onClick={() => handleClick(props.pokemon.id)}>
      <Card className="mb-4 w-full mx-5 h-full hover:bg-gray-300 hover:cursor-pointer">
        <CardHeader>
          <CardTitle>
            <Image
              src={props.pokemon.sprites.front_default}
              alt="front default"
              width={64}
              height={64}
            />
            {toUpperCase(props.pokemon.name)}
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
    </div>
  );
}
export default ItemComponent;
