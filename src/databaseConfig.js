import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()
const mongoClient = new MongoClient(process.env.DATABASE_URL)

try {
  await mongoClient.connect()
  console.log("Tudo certo com o MongoClient :)")
} catch (err){
  console.log(err)
}

export const db = mongoClient.db()