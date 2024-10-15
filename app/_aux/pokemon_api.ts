import * as Pokemon from "../_interfaces/pokemon";
import * as Ability from "../_interfaces/ability";
import * as CustomPokemon from "../_interfaces/custom"
async function requestPokemonList(limit: number, offset: number) {


	const request = await fetch(
		process.env.NEXT_PUBLIC_POKEMON_URL_BASE + `pokemon?limit=${limit}&offset=${offset}`,
	);
	const response = await request.json();

	const promises = response.results.map((pokemon: { url: string }) => requestPokemonData(pokemon.url));
	const pokemon_list: Pokemon.Root[] = await Promise.all(promises);

	return pokemon_list;
}

async function requestPokemonData(url: string) {
	const request = await fetch(url)
	const response = await request.json()
	return response;
}


export async function getPokemonList(props: { limit: number, offset: number, tries: number }): Promise<Pokemon.Root[]> {
	const base_delay = 1000
	try {
		return requestPokemonList(props.limit, props.offset)
	} catch (error) {
		if (props.tries > 0) {
			const time = base_delay * Math.pow(2, props.tries)
			await new Promise((resolve) => setTimeout(resolve, time))
			return await getPokemonList({ limit: props.limit, offset: props.offset, tries: props.tries - 1 })
		} else {
			throw error;
		}
	} 
}


async function requestPokemonDetails(id: number): Promise<Pokemon.Root> {
	const request = await fetch(process.env.NEXT_PUBLIC_POKEMON_URL_BASE + `pokemon/${id}`)
	const response = await request.json()

	return response;
}



export async function getPokemonDetails(props: { id: number, tries: number }): Promise<Pokemon.Root> {
	const base_delay = 1000
	try {
		return requestPokemonDetails(props.id)
	} catch (error) {
		if (props.tries > 0) {
			const time = base_delay * Math.pow(2, props.tries)
			await new Promise((resolve) => setTimeout(resolve, time))
			return await getPokemonDetails({ id: props.id, tries: props.tries - 1 })
		} else {
			throw error;
		}
	} 
}

/*
Abilties request section ahead
--------------------------
*/

async function requestPokemonAbility(url: string): Promise<Ability.Root> {
	const request = await fetch(url)
	const response = await request.json()

	return response;
}



async function requestPokemonAbities(abilities: Pokemon.Ability[]) {
	const promises = abilities.map((item => requestPokemonData(item.ability.url)));
	const details: Ability.Root[] = await Promise.all(promises)
	return details;
}


export async function getPokemonAbilities(props: { list: Pokemon.Ability[], tries: number }): Promise<Ability.Root[]> {
	const base_delay = 1000
	try {
		return requestPokemonAbities(props.list);
	} catch (error) {
		if (props.tries > 0) {
			const time = base_delay * Math.pow(2, props.tries)
			await new Promise((resolve) => setTimeout(resolve, time))
			return await getPokemonAbilities({ list: props.list, tries: props.tries - 1 })
		     
		} else {
			throw error;
		}
	}
	
}


/*
Abitilies request section ends
--------------------------
*/

export async function RequestAllPokemons(): Promise<Pokemon.Root[]> {
	const request = await fetch(
		process.env.NEXT_PUBLIC_POKEMON_URL_BASE + `pokemon?limit=1000&offset=0`,
	);
	const response = await request.json()
	return response.results;
}



export async function requestSearched(pokemons: CustomPokemon.PokemonSearch[]) {

	const promises = pokemons.map(item => requestPokemonData(item.url))

	const results: Pokemon.Root[] = await Promise.all(promises)
 
	requestCache(results)
	return results
} 


function requestCache(pokemons: Pokemon.Root[]) {
 
	 
	fetch("/pokemon", {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(pokemons)
	})

	
}
