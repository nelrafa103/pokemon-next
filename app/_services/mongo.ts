import { MongoClient } from "mongodb";
import * as Sentry from "@sentry/nextjs";
/*Is neeed to add an automatic resume/stop on the cluster  */
export class Mongo {
  private constructor() {}
  private static client: MongoClient = new MongoClient(
    process.env.MONGO_URL || "",
  );

  private static isConnected = false;
  private static async connect(db: string) {
    try {
      if (Mongo.isConnected == false) {
        await Mongo.client.connect();
        Mongo.isConnected = true;
      }
      return Mongo.client.db(db);
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Could not connect to the database.");
    }
  }

  static async usersCollection() {
    try {
      const client = await Mongo.connect("pokemon-next");
      return client.collection("users");
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Could not connect to the database.");
    }
  }

  static async pokemonsCollection() {
    try {
      const client = await Mongo.connect("pokemon-next");
    
      return client.collection("pokemons");
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Could not connect to the database.");
    }
  }

  static async authenticationCollection() {
    try {
      const client = await Mongo.connect("logs");
      return client.collection("authentication");
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Could not connect to the database.");
    }
  }



  static async tokenCollection() {
    try {
      const client = await Mongo.connect("logs");
      return client.collection("tokens");
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Could not connect to the database.");
    }
  }

  static async userCollection() {
    try {
      const client = await Mongo.connect("pokemon-next");
      return client.collection("collections");
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Could not connect to the database.");
    }
  }

}
