
"use client"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function ButtonComponent(props: { value: string }) {
	const router = useRouter()
    const pathname = usePathname()

	const isInSignIn = pathname.includes("signin") ? true : false
	return (
		<>
			{
				isInSignIn == false ? (<NavigationMenuLink asChild>
					<a
						className="flex h-full w-full select-none flex-col justify-end rounded-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
						href="/signin"
					>
						<Button onClick={() => router.push("/signin")}>{props.value}</Button>
					</a>
				</NavigationMenuLink>) : <> </>
			}
	

		</>)
}