"use client";
import React from "react";
import * as Pokemon from "@/app/_interfaces/pokemon";
import { getPokemonDetails } from "@/app/_aux/pokemon_api";
import LoadingPage from "./loading";

const HeroComponent = React.lazy(() => import("../_components/hero"));
const ListComponent = React.lazy(() => import("../_components/list"));

interface DetailsProps {
  id: number;
}
export default function Details({
  params,
}: {
  params: DetailsProps;
}): React.ReactElement<DetailsProps> {
  const [details, setDetails] = React.useState<Pokemon.Root>();
  React.useEffect(() => {
    getPokemonDetails({ id: params.id, tries: 5 }).then((res) =>
      setDetails(res),
    );
  }, []);

  /*const spriteSrc =
    details?.sprites?.other["official-artwork"].front_default || "";
  const name = details?.name || "No available";
  const abilities = details?.abilities || [];
  if (!isNaN(params.id) === false) {
    return <NotFound key={"Not found"} />;
  } */
  if (details == null || details == undefined) {
    return <LoadingPage />;
  }
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <HeroComponent
        pokemon={details!}
        key={"Detailed Heroe"}
      />
      <ListComponent abilities={details?.abilities} />
    </React.Suspense>
  );
}
