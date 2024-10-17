import { requestAllUserData } from "./app/_aux/dumbjson_api";
import { RequestAllPokemons } from "./app/_aux/pokemon_api";
import * as Sentry from "@sentry/nextjs";
import { extractNumbers } from "./app/_aux/server_utils";
import * as CustomPokemon from "@/app/_interfaces/custom";
async function divideArray(
  array: CustomPokemon.Result[],
  numOfSubarrays: number,
): Promise<Array<Array<CustomPokemon.Result>>> {
  const subarrayLength = Math.ceil(array.length / numOfSubarrays);

  const subarrays: Array<Array<CustomPokemon.Result>> = [];

  for (let i = 0; i < array.length; i += subarrayLength) {
    subarrays.push(array.slice(i, i + subarrayLength));
  }

  return subarrays;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    import("./app/_services/mongo").then(async ({ Mongo }) => {
      const pokemons = await Mongo.pokemonsCollection();
      const users = await Mongo.usersCollection();
      const Apollo = await import("./app/_services/apollo");
      

      try {
        const pokemons_amount = await pokemons.countDocuments();
        const users_amount = await users.countDocuments();

        if (pokemons_amount == 0) {
       
          const response: CustomPokemon.Root = await RequestAllPokemons();
          const parts = await divideArray(response.results, 100);

          const newObject = response.results;
          let index = 0;
          for (const element of parts) {
            const promises = element.map(async (item) => {
              const id = (await extractNumbers(item.url)).slice(1);
              return Apollo.default.getPokemonTypes(Number(id));
            });
            const res = await Promise.all(promises);
            res.map(async (item) => {
              newObject[index].type =
                item.pokemon_v2_pokemontype[0].pokemon_v2_type.name;
             
            });

            pokemons.insertOne(newObject[index])
            index += 1;

            if ((index % 10) - 1 != 0) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            } else {
              await new Promise((resolve) => setTimeout(resolve, 10000));
            }
          }
      
        }

        if (users_amount == 0) {
          const response = await requestAllUserData();
          users.insertMany(response.users);
        }
      } catch (e) {
        console.error(e);
      } finally {
        import("./app/_services/redis").then(async ({ Redis }) => {
          const count = await Redis.check();
          if (count == 0) {
            const initialCache = await pokemons
              .find()
              .limit(Number(process.env.REDIS_LIMIT) || 100)
              .toArray();
            const promises = initialCache.map((item) =>
              Redis.push({ key: item.name, value: item.url }),
            );
            await Promise.all(promises);
          }
        });
      }
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
