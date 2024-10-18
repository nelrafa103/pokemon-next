"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { recomendations } from "../_aux/search_engine";
import { useRouter } from "next/navigation";

function AutoCompleteComponent() {
  const pathname = usePathname();
  const value = useRef("");
  const router = useRouter();
  const [recommendations, setRecommendations] = React.useState<Recomendation[]>(
    [],
  );
  async function handleChange(input: string) {
    value.current = input;
    if (input.trim() !== "") {
      const req = await recomendations(value.current);
      setRecommendations(req.tasks);
    }
  }

  React.useEffect(() => {
    console.log(recommendations);
  }, [value.current]);
  const isInSearch = pathname.includes("search") ? true : false;
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      {isInSearch == false ? (
        <Autocomplete
          label="Select an pokemon"
          className="min-w-xs"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              router.push(`/search/${value.current}`);
            }
          }}
          onInputChange={(value) => handleChange(value)}
        >
          {recommendations.map((item) => (
            <AutocompleteItem key={item.name} value={item.url}>
              {item.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      ) : (
        <> </>
      )}
    </div>
  );
}
export default AutoCompleteComponent;

interface Recomendation {
  name: string;
  url: string;
  type: string;
}
