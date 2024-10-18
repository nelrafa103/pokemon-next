import Users from "../../_services/users";
import { SignInAuth } from "../../_interfaces/custom";
import { NextResponse } from "next/server";
import { captureMessage } from "@sentry/react";
import jwt from "jsonwebtoken";
//import { isEmailValid, validatePassword } from "../_aux/utils";
//import { validateEmailDomain } from "../_aux/server_utils";
import { Mongo } from "../../_services/mongo";

export async function POST(request: Request): Promise<NextResponse> {
  console.log(request.headers)

  const formData = await request.formData();

  const email: FormDataEntryValue = formData.get("email")!;
  const password: FormDataEntryValue = formData.get("password")!;
  console.log(email,password)
  if (email && password) {
    const form: SignInAuth = {
      email: String(email),
      password: String(password),
    };
    /*if (!isEmailValid(form.email) || !(await validateEmailDomain(form.email))) {
      return new NextResponse(
        JSON.stringify({ message: "It's not possible to sing in" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (validatePassword(form.password).length != 0) {
      return new NextResponse(
        JSON.stringify({ message: "It's not possible to sing in" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } */
    try { 
     const auth = await Users.authenticate(form);
      if (auth != null) {
         
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "", {
          expiresIn: "3h",
        });

         const authLogs = await Mongo.authenticationCollection()
         authLogs.insertOne({
          currentTime: new Date(),
          email: form.email,
          result: 'resolved'
         })
          
        /*Hacer algo aqui para comprobar de que todo esta bien*/
        return new NextResponse(JSON.stringify({token: token, email}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
 
      } else {
        return new NextResponse(
          JSON.stringify({ message: "The user of the password are incorrect" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    } catch (e) {
      return new NextResponse(
        JSON.stringify({ error: "Authentication failed", details: e }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    } finally {
      captureMessage(
        `The user authenticate is: ${form.email} at this time: ${new Date()}`,
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "Insuficient data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
