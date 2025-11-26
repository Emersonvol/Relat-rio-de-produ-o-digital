import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

if (!uri) {
  throw new Error("❌ MONGO_URI não configurada no Vercel");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
  }
  client = global._mongoClient;
  clientPromise = global._mongoClient.connect();
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

