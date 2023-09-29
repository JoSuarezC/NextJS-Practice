import { MongoClient } from 'mongodb';

const mongoenv = process.env;
const MONGODB_URI = `mongodb+srv://${mongoenv.mongodb_username}:${mongoenv.mongodb_password}@${mongoenv.mongodb_clustername}.fbxmmhb.mongodb.net/${mongoenv.mongodb_database}`;

export async function openConnection() {
  const client = await MongoClient.connect(MONGODB_URI);
  return client;
}
