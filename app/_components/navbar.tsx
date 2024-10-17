"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import AutoCompleteComponent from "./autocomplete";
import ButtonComponent from "./navbar/button";
import { useRouter } from "next/navigation";
import React from "react";
export default function NavComponent(): React.ReactElement {
  const router = useRouter();
  return (
    <NavigationMenu className="flex flex-row min-w-full pt-3">
      <div className="w-1/2">
        <NavigationMenuList className="flex-1">
          <NavigationMenuItem>
            <NavigationMenuLink>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                />
              </svg>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={() => router.push("/about")}>
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/about"
              >
                Informacion del proyecto
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={() => router.push("/search")}>
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/search"
              >
                Busqueda de Pokemones
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
      <div className="justify-end w-1/2 md:flex hidden">
        <NavigationMenuList className="place-self-end justify-self-end mx-12">
          <NavigationMenuItem>
            <AutoCompleteComponent key={"Navbar autocomplete"} />
          </NavigationMenuItem>
          <NavigationMenuItem className="p-4">
            <ButtonComponent key={"Sign-In Button"} value="Sign-In" />
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
