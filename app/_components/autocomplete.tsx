"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import * as React from 'react'
import { recomendations } from "../_aux/search_engine";
import { usePathname, useRouter } from "next/navigation";

function AutoCompleteComponent() {

	const router = useRouter()
	const pathname = usePathname()
	const [value, setValue] = React.useState("")

	const animals = [
		{
			value: "Cow",
			label: "cow"
		}

	]

	
	const isInSearch = pathname.includes("search") ? true: false
	function handleChange(value: string) {
		//	recomendations({ param: value })
	}
	return <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
		{
			 isInSearch == false ? (<Autocomplete 
				label="Select an animal" 
				className="max-w-xs" 
				onChange={(event) => setValue(event.target.value)}
			>
				{animals.map((animal) => (
					<AutocompleteItem key={animal.value} value={animal.value}>
						{animal.label}
					</AutocompleteItem>
				))}
			</Autocomplete>) : <> </>
		}
		
	</div>
}
export default AutoCompleteComponent