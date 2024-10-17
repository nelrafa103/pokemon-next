interface PokemonType {
  __typename: string;
  id: number;
  pokemon_id: number;
  type_id: number;
  slot: number;
  pokemon_v2_type: PokemonV2Type; // Este es un objeto anidado, deberías definir su estructura
}

interface PokemonV2Type {
  // Aquí puedes definir las propiedades que tenga el objeto anidado "pokemon_v2_type"
  id: number;
  name: string;
}

export interface PokemonTypesResponse {
  pokemon_v2_pokemontype: PokemonType[];
}
