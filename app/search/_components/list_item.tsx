import { Root } from "@/app/_interfaces/pokemon";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { count } from "console";
import { toUpperCase } from "@/app/_aux/utils";
export function ListItemComponent(props: { pokemon: Root }) {
  return <BaseComponent item={props.pokemon} />
  
}

export function ListItemPlaceholder(props: { placeholders: any[], count: number }) {
  let component_list: any = [];
  for (let i: number = 0; i < props.count; i++) {
    component_list.push(<BaseComponent item={props.placeholders[i]} key={`BaseComponet${i}`} />) 
  }
  return component_list;
  
}




function BaseComponent(props: { item: any }) {
  return (<Card className="max-w-[400px] m-6">
    <CardHeader className="flex gap-3">
      <Image
        alt="nextui logo"
        height={40}
        radius="sm"
        src={props.item.id != undefined ? props.item.sprites.other["official-artwork"].front_default: "" }
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
  </Card>)
}
