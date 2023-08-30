import { client } from '../config/db.config';

interface IResponceOrder {
	id: string;
	count: string;
	price: string;
}

export const RedisService = {
	async addOrder({ id, count, price }: IResponceOrder): Promise<boolean> {
		const newOrder = await client.setEx(id, 300, JSON.stringify({ id, count, price }));
		console.log(newOrder);
		return true;
	},

	async getOrderById(id: string): Promise<IResponceOrder> {
		const order = await client.get(id);

		return JSON.parse(order);
	},

	async getOrderArray() {
		const response = await client.get('arrayorder');
		return JSON.parse(response);
	},

	async setOrderArray(array: IResponceOrder[]) {
		const response = await client.setEx('arrayorder', 300, JSON.stringify(array));
		return JSON.parse(response);
	},
};
