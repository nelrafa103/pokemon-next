"use server";

import { Mongo } from "../_services/mongo";
import { Redis } from "../_services/redis";
import * as Pokemon from "../_interfaces/pokemon";
import { PokemonSearch, SearchParams } from "../_interfaces/custom";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const req: SearchParams = await request.json();

    const collection = await Mongo.pokemonsCollection();
    const results = await collection
      .find({
        $or: [
          { name: { $regex: req.input, $options: "i" } },
          { type: { $regex: req.input, $options: "i" } },
        ],
      })
      .toArray();

    const promises = results.map((item) => Redis.get({ key: item.name }));
    const loaded = await Promise.all(promises);
    const parsed = loaded.map((item) => {
      return JSON.parse(item);
    });
    const filtered = parsed.filter(
      (item) => typeof item != "string" && item != null,
    );

    return new NextResponse(
      JSON.stringify({
        tasks: results,
        resolved: filtered,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<PutInterface>> {
  try {
    const body = (await request.json()) as Pokemon.Root[];

    const promises = body.map((item) =>
      Redis.push({ key: item.name, value: item }),
    );
    const req = await Promise.all(promises);
    console.log(req);
    return new NextResponse(
      JSON.stringify({
        status: "ok",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (error) {
    Sentry.captureException(error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
      }),
    );
  }
}

interface PutInterface {
  status: string;
}

export interface Response {
  tasks: PokemonSearch[];
  resolved: Pokemon.Root[];
}
