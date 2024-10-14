import ListComponent from "./_components/list";
import HeroComponent from "./_components/hero";
export default function Home() {
  return (
    <>
      <HeroComponent key={"Hero Sectino"} />
      <ListComponent key={"Pokemons list"} />
    </>
  );
}
