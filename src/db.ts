import { MongoClient } from 'mongodb';

const {
  MONGO_URI = 'mongodb+srv://wahengbamnanda:7sdoJBkxZHgxcIfd@cluster0.jdjsqze.mongodb.net/?retryWrites=true&w=majority',
} = process.env;

console.log('process.env', process.env.MONGO_URI);

export const client = new MongoClient(MONGO_URI!);
export const db = client.db();

client.connect();
