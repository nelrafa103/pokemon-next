import  React from 'react'
import ListComponent from "./_components/list";
import HeroComponent from "./_components/hero";
export default function Home(): React.ReactElement {
  return (
    <>
      <HeroComponent key={"Hero Sectino"} />
      <ListComponent key={"Pokemons list"} />
    </>
  );
}
