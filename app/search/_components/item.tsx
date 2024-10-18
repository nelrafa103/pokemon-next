"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { toUpperCase } from "@/app/_aux/utils";
import * as Pokemon from "@/app/_interfaces/pokemon";
import { useRouter } from "next/navigation";
import React from "react";

export default function BaseComponent(props: {
  item: Pokemon.Root;
}): React.ReactElement {
  const router = useRouter();
  return (
    <div
      className="max-w-[400px] m-6"
      onClick={() => router.push(`/details/${props.item.id}`)}
    >
      <Card className="max-w-[400px] m-6 hover:bg-gray-300 hover:cursor-pointer">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={
              props.item.id != undefined
                ? props.item.sprites.other["official-artwork"].front_default
                : ""
            }
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md text-xl">{toUpperCase(props.item.name)}</p>
            <p className="text-small text-default-500">nextui</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Pokemons is fun and colorful</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href={`http://localhost:3000/details/${props.item.id}`}
          >
            Visit detail page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
