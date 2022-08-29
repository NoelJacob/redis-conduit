import {Client} from 'redis-om';

export const client = await new Client()
await client.open(process.env.REDIS_URL)
