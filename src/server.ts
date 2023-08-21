import { createReadStream } from 'fs';
import TelegramBot from 'node-telegram-bot-api';
import { resolve } from 'path';
import { StartKeyWords } from './constants/data';
import { about } from './events/about.events';
import { createOrder } from './events/order.events';

const token = '6445823476:AAH0HDRwZMIfc5i3VvZFzNlkpoiEykhWCxM';

export const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
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

bot.on('text', msg => {
	const chatId = msg.chat.id;

	if (msg.text === '🖥 Kiritikal Hacking 📵') {
		const image = createReadStream(resolve('uploads', 'critical.png'));
		bot.sendPhoto(msg.from.id, image, {
			caption: `👋 Welcome to our course Critical hacking. 
			📲	Register now and start free learning.`,
			reply_markup: {
				resize_keyboard: true,
				one_time_keyboard: true,
				inline_keyboard: [
					[
						{
							text: "📨 Royxadan o'tish",
							callback_data: 'critical',
						},
					],
				],
			},
		});
	} else if (msg.text === '🌐 Network Hacking ❌') {
		const image = createReadStream(resolve('uploads', 'network.jpeg'));
		bot.sendPhoto(msg.from.id, image, {
			caption: `👋 🌐 Welcome to our course Network hacking. 
			📲	Register now and start free learning.`,
			reply_markup: {
				resize_keyboard: true,
				one_time_keyboard: true,
				inline_keyboard: [
					[
						{
							text: "📨 Royxadan o'tish",
							callback_data: 'network',
						},
					],
				],
			},
		});
	} else if (msg.text === '⚠️ Database Killing 🚭') {
		const image = createReadStream(resolve('uploads', 'database.jpeg'));
		bot.sendPhoto(msg.from.id, image, {
			caption: `👋 ⚠️ Welcome to our course Database killing. 
			📲	Register now and start free learning.`,
			reply_markup: {
				resize_keyboard: true,
				one_time_keyboard: true,
				inline_keyboard: [
					[
						{
							text: "📨 Royxadan o'tish",
							callback_data: 'database',
						},
					],
				],
			},
		});
	}
});

bot.on('callback_query', query => {
	const chatId = query.message.chat.id;
	const data = JSON.parse(query.data);

	console.log(data);
	

	if (data === 'critical') {
		bot.sendMessage(
			chatId,
			'📞 Please share us your phone.📌 You selected the Critical Hacking course!',
			{
				reply_markup: {
					resize_keyboard: true,
					one_time_keyboard: true,
					keyboard: [[{ text: '📲 Phone number', request_contact: true, }]],
				},
			}
		);
	} else if (data === 'network') {
		bot.sendMessage(
			chatId,
			'📞 Please share us your phone.📌 You selected the Network Hacking course!',
			{
				reply_markup: {
					resize_keyboard: true,
					one_time_keyboard: true,
					keyboard: [[{ text: '📲 Phone number', request_contact: true }]],
				},
			}
		);
	} else if (data === 'database') {
		bot.sendMessage(
			chatId,
			'📞 Please share us your phone.📌 You selected the Database Killing course!',
			{
				reply_markup: {
					resize_keyboard: true,
					one_time_keyboard: true,
					keyboard: [[{ text: '📲 Phone number', request_contact: true }]],
				},
			}
		);
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

bot.on('contact', contact => {
	const chatId = contact.chat.id;

	bot.sendMessage(chatId, '🥳 Thank you 🔗 we call you a few seconds');
	bot.sendMessage(
		-1001825202150,
		`
	👤 Name  - ${contact.chat.first_name}
	☎️ Phone - ${contact.contact.phone_number} 
	`
	);
});
