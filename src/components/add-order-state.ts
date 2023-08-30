import { ISingleSubProduct } from 'interfaces/order-interfaces';
import { bot } from '../server';
import { RedisService } from '../services/redis.service';

interface IExistOrder {
	id: string;
	count: string;
	price: string;
}

async function addOrderState(
	data: ISingleSubProduct,
	existOrder: IExistOrder,
	count: number,
	chatId: string,
	messageId: number
) {
	if (existOrder) {
		existOrder.count = ` ${+existOrder.count + 1}`;
		existOrder.price = `${+existOrder.price + data.price}`;

		await RedisService.addOrder(existOrder);
	} else {
		await RedisService.addOrder({
			id: data._id,
			count: '1',
			price: String(data.price),
		});
	}

	bot.editMessageReplyMarkup(
		{
			inline_keyboard: [
				[
					{
						text: '➖',
						callback_data: JSON.stringify({
							action: 'remove',
							id: data._id,
						}),
					},
					{
						text: `${+count + 1}`,
						callback_data: 'count',
					},
					{
						text: '➕',
						callback_data: JSON.stringify({
							action: 'add',
							id: data._id,
						}),
					},
				],
				[
					{
						text: "🛒 Savatga qo'shish",
						callback_data: JSON.stringify({
							action: "savatga qo'shish",
							id: data._id,
						}),
					},
				],
				[
					{
						text: '◀️ Orqaga',
						callback_data: 'back',
					},
				],
			],
		},
		{ chat_id: chatId, message_id: messageId }
	);
}

export default addOrderState