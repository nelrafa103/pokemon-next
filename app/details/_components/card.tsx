
import * as React from 'react'

import Image from 'next/image';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Root } from '@/app/_interfaces/ability';

function ItemComponent(props: { abilty: Root }) {
	const generation = toUpperCase(props.abilty.generation.name)
	const name = toUpperCase(props.abilty.name)
	return (<>

		<Card
			className="mb-4 w-10/12 mx-5 md:h-full h-64 hover:bg-gray-300 hover:cursor-pointer min-h-full text-clip overflow-hidden"
		>
			<CardHeader>
				<CardTitle>
					 {name} 
				</CardTitle>
				<CardContent>
					<h3 className='text-lg font-bold'> {generation}</h3>
					<ul className='text-lg'> {
						props.abilty.effect_entries.map((item, index) => 

							<li key={index}>{item.short_effect} </li>

						)
					} </ul>
				</CardContent>
			</CardHeader>
		</Card>
	</>)
}
export default ItemComponent


function toUpperCase(name: string) {
	return name.charAt(0).toUpperCase() + name.slice(1)
}