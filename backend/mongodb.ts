// const MongoClient = require("mongoodb").MongoClient;
import MongoClient from "mangoodb";
const url =
  "mongodb+srv://yusuffsmartt:6zhqhrBKUR4ZjVrA@ysdcuster1.rcw7n.mongodb.net/";
const dbname = "abdata";

const client = new MongoClient(dbname, url);

export async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

export default client;
