"use server"
import { MongoClient } from "mongodb";

interface SearchParam {
	param: string
}


export default async function POST(request: Request) {
	const mongo_client = new MongoClient("mongodb+srv://nelcidodiaz13:rHpd2WCEfaRi1XFs@cluster0.lewzq.mongodb.net/");
	const db = (await mongo_client).db("pokemon-next");
	const req: SearchParam = await request.json()
	const collection = db.collection("pokemons")
	const results = await collection.find({
		name: { $regex: req.param, $options: 'i' }
	}).toArray()

	return Response.json(JSON.stringify({
		res: results
	}))

}