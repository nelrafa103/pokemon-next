"use server"

import { Mongo } from "../_services/mongo"
import { Redis } from "../_services/redis"
import * as Pokemon from '../_interfaces/pokemon'
import { PokemonSearch, SearchParams } from "../_interfaces/custom"
import { NextResponse } from "next/server"


export async function POST(request: Request): Promise<NextResponse> { 

	try {
		const req: SearchParams = await request.json()

		const collection = await Mongo.pokemonsCollection()
		const results = await collection.find({
			name: { $regex: req.input, $options: 'i' }
		}).toArray()
	

		const promises = results.map(item => Redis.get({key: item.name}))
        const loaded = (await Promise.all(promises)).filter((item) => typeof item != "string" && item != null)

		return new NextResponse(JSON.stringify({
			task: results,
			resolved: loaded
		}), {
			status: 200,
			headers: {
				"Content-Type": "json/application"
			}
		})
	} catch (error) {
		return new NextResponse(JSON.stringify({
			message: "Failed"
		}), {
			status: 404,
			headers: {
				"Content-Type": "json/application"
			}
		})
	}




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