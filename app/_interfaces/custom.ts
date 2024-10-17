export interface PokemonSearch {
  _id: string;
  name: string;
  url: string;
}

export interface SignInAuth {
  password: string;
  email: string;
 
}

export interface SearchParams {
  input: string;
}

export interface Root {
  count: number
  next: string
  previous: string
  results: Result[]
}

export interface Result {
  name: string
  type?: string 
  url: string
}
