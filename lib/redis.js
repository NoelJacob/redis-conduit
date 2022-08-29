import {Client} from 'redis-om';

export const client = await new Client().open(process.env.REDIS_URL)

console.log(await client.execute(['PING']) === 'PONG' ? 'Redis Connected!' : 'Oops!');