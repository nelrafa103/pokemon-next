export default async function GET(request: Request) {
	const formData = await request.formData()

	const req = await fetch('https://dummyjson.com/user/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: formData.get("username"),
			password: formData.get("password"),
			expiresInMins: 30, // optional, defaults to 60
		}),
	})
		
	const res = await req.json()

	return Response.json(JSON.stringify(res))

}