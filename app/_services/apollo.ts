import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { captureException } from "@sentry/react";

export default class Apollo {
  private constructor() {}

  private static client = new ApolloClient({
    uri: process.env.POKEMON_GRAPHQL_URL_BASE,
    cache: new InMemoryCache(),
  });

  static async getPokemonTypes(id: number) {
    try {
        const req = await Apollo.client.query({
            query: gql`
              query samplePokeAPIquery($id: Int!) {
                pokemon_v2_pokemontype(where: { id: { _eq: $id } }) {
                  id
                  pokemon_id
                  type_id
                  slot
                  pokemon_v2_type {
                    name
                  }
                }
              }
            `,
            variables: { id: id },
          });
          return req.data;
    }catch(error) {
        console.log(error)
       captureException(error)
    }
  
  }
}
