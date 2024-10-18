/* I'm goin to implement a system where certain data will be store in mongodb, data as name, url etc..
For faster searching on databases*/
// function search_engine() {}

/* Mover este codigo a pokemon service, agregar aqui codigo para trc*/

export async function recomendations(input: string) {
  const req = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });
  const res = await req.json()

  return res;
}
