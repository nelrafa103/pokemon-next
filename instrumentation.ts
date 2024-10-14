"use server"

import { requestAllUserData } from './app/_aux/dumbjson_api';
import { RequestAllPokemons } from './app/_aux/pokemon_api';

 
export async function register() {

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    import('./app/_services/mongo').then(async ({ Mongo }) => {

      const pokemons = await Mongo.pokemonsCollection()
      const users = await Mongo.usersCollection()

      try {


        const pokemons_amount = await pokemons.countDocuments() 
        const users_amount = await users.countDocuments() 

        if (pokemons_amount == 0) {
          const response = await RequestAllPokemons()
          pokemons.insertMany(response)
        } 


        if (users_amount == 0) {
          const response = await requestAllUserData();
          users.insertMany(response.users)
        }


      } catch (e) {
        console.error(e);
      } finally {

        import("./app/_services/redis").then(async ({ Redis }) => {
          const initialCache = await pokemons.find().limit(Number(process.env.REDIS_LIMIT) || 100).toArray()
          for (let item of initialCache) {
            Redis.push({ key: item.name, value: item.url })
          }
        })
      }
    });

   

  }
}

