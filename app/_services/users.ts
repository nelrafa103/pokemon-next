"only server"

import { Mongo } from "./mongo"



export default class Users {
	private constructor() {}


	static async authenticate(props: {email: string, password: string}) {
		
		 
		const users = await Mongo.usersCollection()
		const result = await users.findOne(
			{
  	          email: props.email,
  	          password: props.password
			}

		)
		return result;
	}
}