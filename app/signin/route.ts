import Users from "../_services/users"
import { SignInAuth } from "../_interfaces/custom"
export async function POST(request: Request) {
	const formData = await request.formData() 

	const email: any = formData.get("email")!
	const password: any = formData.get("password")!

	if (email && password) {
		const form: SignInAuth = { email, password }

		try {
			const auth = await Users.authenticate(form)
			return new Response(JSON.stringify(auth), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
          
		} catch (e) {
			return new Response(JSON.stringify({ error: 'Authentication failed', details: e }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			});
		} finally {
			/* Send me some logs to my app*/
		}
	} else {
		return new Response(JSON.stringify({ error: "Insuficient data" }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		})
	} 
	

}