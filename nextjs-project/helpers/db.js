import { MongoClient } from 'mongodb';

const MONGODB_URI =
  'mongodb+srv://josuarezcam:uPA2BQQAaxfNKUjg@cluster0.fbxmmhb.mongodb.net/nextJSEvents';

export async function openConnection() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('nextJSEvents');
  return [db, client.close];
}

