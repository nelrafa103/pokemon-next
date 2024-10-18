import { Mongo } from "@/app/_services/mongo";
import { NextRequest, NextResponse } from "next/server";
 

export async function GET(request: NextRequest, { params }: { params: { value: string } }): Promise<NextResponse> {
  try {
   // const token = request.nextUrl.searchParams.get("token");
    const token = params.value
    const res = (await Mongo.tokenCollection()).findOne({
      value: token,
    }); 
   if (res != undefined && res != null) {
      return new NextResponse(
        JSON.stringify({
          status: "exist!",
        }),
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          status: "Doesnt exist!",
        }),
      );
    }
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({
        message: "The token could be generate",
      }),
    );
  } 

     
}
