import { Redis } from "../_services/redis"
import Users from "../_services/users"

export async function POST(request: Request) {
	const formData = await request.formData()
	console.log(process.env.MONGO_URL)

	const email: any = formData.get("email")!
	const password: any = formData.get("password")!
	console.log(typeof email)
//	const res = await Redis.push({ key: "name", value: "nelcido" })
//	console.log(res)
	if (email != null && typeof password != null) {
		const mongo_response = await Users.authenticate({ email: email, password: password })
	
		console.log(mongo_response)
		return Response.json(mongo_response)
	}
	

}