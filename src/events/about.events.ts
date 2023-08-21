import { courses } from '../constants/data';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { bot } from '../server';

export function about() {
	return bot.on('text', msg => {
		const chatId = msg.chat.id;
		if (msg.text === 'ℹ️ Biz haqimizda' || msg.text === '/about') {
			const image = createReadStream(resolve('uploads', 'hacker.jpg'));
			bot.sendPhoto(chatId, image, {
				caption: `🏬 Our company is the best learning center with experiance 10 years. 
				💻 Our company has the most  popular programming courses and hacing courses
					
				📚 we have two types of off courses
					✔️Programming courses
					✔️Hacking courses
					
				🔴 If you want to learng with us entroll courses now 📝`,
				reply_markup: {
					resize_keyboard: true,
					one_time_keyboard: true,
					keyboard: [[...courses]],
				},
			});
		}
	});
}
