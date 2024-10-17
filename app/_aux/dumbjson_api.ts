import * as Users from "../_interfaces/user";

export async function requestAllUserData(): Promise<Users.Root> {
  const req = await fetch(`${process.env.DUMB_JSON_URL_BASE}users`);
  const res: Promise<Users.Root> = (await req).json();
  return res;
}
