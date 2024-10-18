import { Mongo } from "@/app/_services/mongo";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const str = body.method + body.ip + body.geo.country + body.geo.city + Date.now().toString();
    const token = jwt.sign({ str }, process.env.JWT_SECRET || "", {
      expiresIn: "3h",
    });

    const tokens = await Mongo.tokenCollection();
    const search = await tokens.findOne({
      value: token,
    });
    if (search == null || search == undefined) {
      tokens.insertOne({ value: token });
    } else {
      return new NextResponse(
        JSON.stringify({
          message: "The token already exist"
        }),
      );
    }

    return new NextResponse(
      JSON.stringify({
        token,
      }),
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({
        message: "The token could be generate",
      }),
    );
  }
}
