"only server"
import { createClient } from 'redis'
export class Redis {

	private constructor() {}
	
	private static client: ReturnType<typeof createClient> | null = null;

	private static async redis() {
		if (!this.client) {
			this.client = createClient({ url: process.env.REDIS_URL })
			await this.client.connect()

		}
		return this.client;
	}


	static async push(props: { key: string, value: any }): Promise<string> {
    
		const redis = await Redis.redis();

		const response = await redis.set(props.key, JSON.stringify(props.value))
		/* It returns the operation */
		return response!;
	}
  	

	static async get(props: { key: string }): Promise<string> {
		const redis = await Redis.redis();
		const response = await redis.get(props.key)

		return response!
	}
}