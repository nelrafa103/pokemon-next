import * as Users from '../_interfaces/user'

export async function requestAllUserData(): Promise<Users.Root> {
	const req = await fetch(`${process.env.DUMB_JSON_URL_BASE}users`);
	const res: any = (await req).json()
	return res as Users.Root
}