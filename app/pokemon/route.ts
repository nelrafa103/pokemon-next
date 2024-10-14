"use server"

import { Mongo } from "../_services/mongo"
import { Redis } from "../_services/redis"
import * as Pokemon from '../_interfaces/pokemon'
import { json } from "stream/consumers"
import { PokemonSearch } from "../_interfaces/custom"
import { parse } from "path"
interface SearchParam {
	param: string
}


export async function POST(request: Request) { 
	const req: SearchParam = await request.json()

	const collection = await Mongo.pokemonsCollection()
	const results = await collection.find({
		name: { $regex: req.param, $options: 'i' }
	}).toArray()
	
	let loaded: any[] = [] 
	for (let item of results) {
		const res = await Redis.get({ key: item.name })
		const parsed = JSON.parse(res)
		if (typeof parsed != "string" && parsed != null) {
			loaded.push(parsed)
		}
	}

	return Response.json({ 
		tasks: results,
		resolved: loaded
	})

}


export async function PUT(request: Request) {
	const body = await request.json() as Pokemon.Root[]
	for (let item of body) {
		Redis.push({ key: item.name, value: item })
	}

	return Response.json(
		{
			status: 'ok'
		})
}

export interface Response {
	tasks: PokemonSearch[],
	resolved: Pokemon.Root[]

}