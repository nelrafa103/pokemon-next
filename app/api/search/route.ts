import { NextRequest, NextResponse } from "next/server";
import { Mongo } from "../../_services/mongo";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  if (body.input != undefined) {
    const pokemons = await Mongo.pokemonsCollection();
    const res = await pokemons
      .find({
        $or: [
          { name: { $regex: body.input, $options: "i" } },
          { type: { $regex: body.input, $options: "i" } },
        ],
      })
      .toArray();
    return new NextResponse(JSON.stringify({ tasks: res }));
  }
  return new NextResponse(JSON.stringify({ message: "No input" }));
}
