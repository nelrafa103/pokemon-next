"use client";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { AvatarDemo } from "../avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
interface ButtonProps {
  value: string;
}
export default function ButtonComponent(
  props: ButtonProps,
): React.ReactElement<ButtonProps> {
  const router = useRouter();
  const pathname = usePathname();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt", "email"]);

  function removeCookies() {
    removeCookie("jwt");
    removeCookie("email");
  }

  const isInSignIn = pathname.includes("signin") ? true : false;
  const jwt = cookies.jwt;
  if (jwt != null && jwt != undefined) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarDemo />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/collections")}>
              <span>Collections</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => removeCookies()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <>
      {isInSignIn == false ? (
        <NavigationMenuLink asChild>
          <a
            className="flex h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            href="/signin"
          >
            <Button onClick={() => router.push("/signin")}>
              {props.value}
            </Button>
          </a>
        </NavigationMenuLink>
      ) : (
        <> </>
      )}
    </>
  );
}
