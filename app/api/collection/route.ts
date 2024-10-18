import { NextRequest, NextResponse } from "next/server";
import { Mongo } from "@/app/_services/mongo";
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const usersCollection = await Mongo.userCollection();
    const isExist = await usersCollection.findOne({
      email: body.email,
      pokemon: body.pokemon,
    });
    console.log(isExist);
    if (isExist == null) {
      const res = await usersCollection.insertOne(body);
      return new NextResponse(JSON.stringify(res), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({
          message: "The resource already exist",
        }),
        {
          status: 200,
        },
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error
      }),
      {
        status: 200,
      },
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const emailHeaders = request.headers.get("Email");
  const usersCollection = await Mongo.userCollection();
  const res = await usersCollection
    .find({
      email: emailHeaders,
    })
    .toArray();

  return new NextResponse(JSON.stringify(res), {
    status: 200,
  });
}
