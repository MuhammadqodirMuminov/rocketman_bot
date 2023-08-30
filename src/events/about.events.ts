import { createReadStream } from 'fs';
import { resolve } from 'path';
import { bot } from '../server';

export function about() {
	return bot.on('text', msg => {
		const chatId = msg.chat.id;
		if (msg.text === 'ℹ️ Biz haqimizda' || msg.text === '/about') {
			const image = createReadStream(resolve('uploads', 'fast-food.jpg'));
			bot.sendPhoto(chatId, image, {
				caption: `🚀Rocketman Yetkazib berish xizmati rasmiy botiga hush kelibsiz !!

				🌐 Bizning web sahifa
				www.rocketman.uz
				
				
				🤖 Rasmiy botlarimiz!!
				https://t.me/rocketmanbot`,
			});
		}
	});
}
