import { Db, MongoClient } from 'mongodb';

interface MongoEnvironment extends NodeJS.ProcessEnv {
  mongodb_username: string,
  mongodb_password: string,
  mongodb_clustername: string,
  mongodb_database: string,
};

const mongoenv = process.env as MongoEnvironment;
const MONGODB_URI = `mongodb+srv://${mongoenv.mongodb_username}:${mongoenv.mongodb_password}@${mongoenv.mongodb_clustername}.fbxmmhb.mongodb.net/${mongoenv.mongodb_database}`;

let _db: Db | undefined;

async function openConnection() {
  const client = await MongoClient.connect(MONGODB_URI);
  return client.db('nextJSBlog');
}

export async function getDB() {
  if (!_db) {
    _db = await openConnection();
  }

  return _db;
}
