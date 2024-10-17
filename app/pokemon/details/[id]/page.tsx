"use client";
import React from "react";
import * as Pokemon from "@/app/_interfaces/pokemon";
import { getPokemonDetails } from "@/app/_aux/pokemon_api";
import LoadingPage from "./loading";
import NotFound from "./not-found";

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
  console.log(params);
  const [details, setDetails] = React.useState<Pokemon.Root>();
  React.useEffect(() => {
    getPokemonDetails({ id: params.id, tries: 5 }).then((res) =>
      setDetails(res),
    );
  }, []);

  const spriteSrc =
    details?.sprites?.other["official-artwork"].front_default || "";
  const name = details?.name || "No available";
  const abilities = details?.abilities || [];
  if (!isNaN(params.id) === false) {
    return <NotFound key={"Not found"} />;
  }
  if (name === "No available") {
    return <LoadingPage />;
  }
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <HeroComponent
        src={spriteSrc}
        alt={name}
        name={name}
        key={"Detailed Heroe"}
      />
      <ListComponent abilities={abilities} />
    </React.Suspense>
  );
}
