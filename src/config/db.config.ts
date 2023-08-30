import { RedisClientType, createClient } from 'redis';

export const client: RedisClientType = createClient({
	username: 'default',
	password: 'muhammadqodir',
});

client.on('error', (err: any) => console.log('Redis Client Error', err));

!(async function () {
	await client.connect();
})();
