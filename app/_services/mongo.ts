
import { MongoClient } from "mongodb";

export class Mongo {
	private constructor() {}
	private static client: MongoClient = new MongoClient(process.env.MONGO_URL || "");


  
	private static async connect(db: string) {
		
		try {
			return Mongo.client.db(db)
		} catch (e) {
			throw e
		} finally {
			console.log("Send some data to server")
		}


	}

	static async usersCollection() {
		const client = await Mongo.connect("pokemon-next")
		return client.collection("users")
	}


	static async pokemonsCollection() {
		const client = await Mongo.connect("pokemon-next")
		return client.collection("pokemons")
	}
} 