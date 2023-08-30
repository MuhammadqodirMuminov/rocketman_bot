import TelegramBot from 'node-telegram-bot-api';
import { StartKeyWords } from './constants/data';
import { about } from './events/about.events';
import { createOrder } from './events/order.events';
import { OrderService } from './services/order.service';
import { RedisService } from './services/redis.service';
import { client } from './config/db.config';

const token = '5456915731:AAES40jBXbzVC0tx1d_gHj5Phd45xPLKaK8';

// '6445823476:AAH0HDRwZMIfc5i3VvZFzNlkpoiEykhWCxM';

export const bot = new TelegramBot(token, { polling: true });
let reqid: string;

bot.onText(/\/start/, msg => {
	const chatId = msg.chat.id;

	const text = ` 😎 Rocketman rasmiy botiga hush kelibsiz  ${msg.from.first_name} 👋
	🚀 Buyurtmani birga joylashtiramizmi? 🤗
	
	Buyurtma berish uchun 🔽 birini tanlang :)
	`;

	bot.sendMessage(chatId, text, {
		reply_markup: {
			resize_keyboard: true,
			one_time_keyboard: true,
			keyboard: StartKeyWords,
		},
	});
});

// order button actions
createOrder();

bot.on('callback_query', async query => {
	const chatId = query.message.chat.id;
	const messageId = query.message.message_id;
	const count = query.message.reply_markup.inline_keyboard[0][1].text;

	const { id, action }: { id: string; action: string } = JSON.parse(query?.data);

	const { data } = await OrderService.getSubProductById(id);
	const existOrder = await RedisService.getOrderById(id);

	switch (action) {
		case 'add':
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
								text: `${existOrder?.count || count + 1}`,
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
			break;
		case 'remove':
			if (existOrder) {
				existOrder.count = ` ${+existOrder.count - 1}`;
				existOrder.price = `${+existOrder.price - data.price}`;
				await RedisService.addOrder(existOrder);
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
								text: `${existOrder.count}`,
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

			break;

		case "savatga qo'shish":
			if (existOrder) {
				reqid = id;

				bot.sendMessage(chatId, '📞 Please share us your phone.!', {
					reply_markup: {
						resize_keyboard: true,
						one_time_keyboard: true,
						keyboard: [[{ text: '📲 Phone number', request_contact: true }]],
					},
				});
			}

			break;
		default:
			break;
	}
});

// Biz haqimizda keyword commands
about();

bot.on('text', msg => {
	const chatId = msg.chat.id;
	if (msg.text === '💡 Help' || msg.text === '/help') {
		bot.sendMessage(
			chatId,
			`
		/start --  start bot and entroll free courses
		/help  --  to get halp type this command
		/about --  is the about the company  
		`
		);
	}
});

bot.on('contact', async contact => {
	const chatId = contact.chat.id;

	bot.sendMessage(
		chatId,
		`Your Phone : ${contact.contact.phone_number} ✅ \n🥳 Please send us your location`,
		{
			reply_markup: {
				resize_keyboard: true,
				keyboard: [[{ text: '📍 Location', request_location: true }]],
			},
		}
	);

	bot.on('location', async location => {
		const chatId = location.chat.id;
		const loc = location.location;


		const existOrder = await RedisService.getOrderById(reqid);

		const order = {
			user : {username : location.chat.first_name , phone: contact.contact.phone_number },
			location: `${loc.latitude}&${loc.longitude}`,
			items: [{ ...existOrder, price : +existOrder.price / +existOrder.count }],
			total_price : +existOrder.price 
		};


		const {status} = await OrderService.orderNow(order);

		if(status == 201) {
			await client.DEL(existOrder.id)
		}
		

		bot.sendMessage(chatId, '🤩 Zakazingiz qabul qilindi tez orada sizga aloqaga chiqamiz !!');
	});
});
