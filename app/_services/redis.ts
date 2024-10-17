"only server";
import { createClient } from "redis";
import * as Sentry from "@sentry/nextjs";

export class Redis {
  private constructor() {}

  private static client: ReturnType<typeof createClient> | null = null;

  private static async createClient() {
    Redis.client = createClient({ url: process.env.REDIS_URL });
    return Redis.client;
  }

  static async push(props: { key: string; value: object }) {
    try {
      const redis = (await Redis.createClient()).connect();
      const response = (await redis).set(
        props.key,
        JSON.stringify(props.value),
      );
      if ((await redis).isOpen) (await redis).quit();
      return response!;
    } catch (e) {
      Sentry.captureException(e);
      throw new Error("There is a problem connecting with the databse");
    }
  }

  static async get(props: { key: string }) {
    try {
      const redis = await (await Redis.createClient()).connect();
      const response = await redis.get(props.key);
      (await redis).disconnect();
      return response!;
    } catch (e) {
      Sentry.captureException(e);
      throw new Error("There is a problem connecting with the databse");
    }
  }

  static async check() {
    try {
      const redis = await (await Redis.createClient()).connect();
      return redis.dbSize();
    } catch (e) {
      Sentry.captureException(e);
      throw new Error("There is a problem connecting with the databse");
    }
  }
}
