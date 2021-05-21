import 'dotenv/config';
import { MongoClient } from 'mongodb';

import User from './interfaces/User';
import Channel from './interfaces/Channel';

const client = new MongoClient(process.env['MONGODB_URI']!, { useUnifiedTopology: true });

client.connect()
.then(() => console.log(`[ MongoDB] Connected at ${new Date().toLocaleString()}`))
.catch(() => console.log(`[ MongoDB ] Connection Failed`));

const db = client.db('kakao-bot');

export const userCollection = db.collection<User>('users');
export const channelCollection = db.collection<Channel>('channels');