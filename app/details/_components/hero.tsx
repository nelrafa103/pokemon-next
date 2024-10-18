"use client";
import { toUpperCase } from "@/app/_aux/utils";
import { Image } from "@nextui-org/react";
import * as Pokemon from "@/app/_interfaces/pokemon";
import React from "react";
import { useCookies } from "react-cookie";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Check } from "lucide-react";

interface HeroProps {
  pokemon: Pokemon.Root;
}

const HeroCompoent = React.memo(
  (props: HeroProps): React.ReactElement<HeroProps> => {
    async function handleClick(pokemon: Pokemon.Root, email: string) {
      const res = await fetch("/api/collection", {
        method: "POST",
        body: JSON.stringify({ pokemon, email: email }),
      });
      const collection = await res.json();
      if (collection.message != null || collection.message != undefined) {
        setError(true);
      } else {
        setSucess(true);
      }
    }

    const [error, setError] = React.useState<boolean>(false);
    const [success, setSucess] = React.useState<boolean>(false);
    React.useEffect(() => {}, [error]);

    const [cookies] = useCookies(["email", "jwt"]);

    return (
      <div className="flex items-center flex-col place-items-center content-center w-full justify-items-center justify-center">
        <Image
          width={300}
          height={300}
          alt={props.pokemon.name}
          src={props.pokemon.sprites.other["official-artwork"].front_default}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center my-5">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{toUpperCase(props.pokemon.name)}</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover amazing features and services that will revolutionize
              your experience.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => handleClick(props.pokemon, cookies.email)}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Add to favorite
                </button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
        {error == true ? (
          <div className="absolute bottom-0 right-0 mr-7">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                I could&apos;nt be possible to add the resource to your personal
                list
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <></>
        )}
        {success == true ? (
          <div className="absolute bottom-0 right-0 mr-7">
            <Alert>
              <Check className="h-4 w-4" />
              <AlertTitle>Sucessed</AlertTitle>
              <AlertDescription>
                The pokemon is now on your own collection
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  },
);
HeroCompoent.displayName = "HeroComponent";

export default HeroCompoent;
