import { createReadStream } from 'fs';
import { resolve } from 'path';
import { StartKeyWords } from '../constants/data';
import { getProductKeys } from '../helpers/getProductKeywords';
import { getSubKeywords } from '../helpers/getSubKeywords';
import { getKeywords } from '../helpers/getkeywords';
import { getSubProductKeys } from '../helpers/getsubProductsKeys';
import { bot } from '../server';
import { OrderService } from '../services/order.service';

export function createOrder() {
	return bot.on('text', async msg => {
		const chatId = msg.chat.id;
		let loadingMessage;
		if (!msg.text.startsWith('/')) {
			loadingMessage = await bot.sendMessage(chatId, '🚀 Kutimoqda...');
		}

		const responseCategory = await OrderService.getALlCategories();
		const responseSubCategory = await OrderService.getAllSubCategories();
		const responseProducts = await OrderService.getAllProsucts();
		const subProduct = await OrderService.getAllSubProducts();

		if (
			responseProducts &&
			subProduct &&
			responseCategory &&
			responseSubCategory &&
			loadingMessage
		) {
			bot.deleteMessage(chatId, loadingMessage?.message_id);
		}

		// GET CATEGORIES
		if (msg.text === '🛒 Buyurtma berish') {
			const keywords = getKeywords(responseCategory.data);

			if (responseCategory.status === 200) {
				bot.sendMessage(chatId, '✅ Quyidagi kategoriyalardan 🔽 birini tanlang!', {
					reply_markup: {
						resize_keyboard: true,
						one_time_keyboard: true,
						keyboard: [...keywords, [{ text: '⬅️ Orqaga' }]],
					},
				});
			}
		}

		// GET CATEGORIES

		responseCategory.data.forEach(async item => {
			if (msg.text === item.category_name) {
				const response = await OrderService.getALlCategories();

				const existCategory = response.data.find(data => data.category_name == item.category_name);

				const keywords = getSubKeywords(existCategory.subCategories);

				const image = createReadStream(resolve('uploads', 'category.jpeg'));
				if (keywords) {
					bot.sendPhoto(msg.from.id, image, {
						caption: `👋 🌯 ${item.category_name} kategoriyasi boyicha ${existCategory.subCategories.length} ta natija topildi.
						
			
			📲	Buyurtma berish uchun 🔽 birini tanlang :)`,
						reply_markup: {
							resize_keyboard: true,
							one_time_keyboard: true,
							keyboard: [...keywords, [{ text: '⬅️ Orqaga' }]],
						},
					});
				}
			}
		});

		// GET  ALL SUBCATEGORIES

		responseSubCategory.data.forEach(async item => {
			if (msg.text === item.sub_category_name) {
				const response = await OrderService.getAllSubCategories();

				const existSubCategory = response.data.find(
					data => data.sub_category_name == item.sub_category_name
				);

				const keywords = getProductKeys(existSubCategory.products);

				const image = createReadStream(resolve('uploads', 'category.jpeg'));
				if (keywords) {
					bot.sendPhoto(msg.from.id, image, {
						caption: `👋 🌯 ${item.sub_category_name} to'plami boyicha ${existSubCategory.products.length} ta mahsulotlar topildi.
						
			
			📲	Buyurtma berish uchun 🔽 birini tanlang :)`,
						reply_markup: {
							resize_keyboard: true,
							one_time_keyboard: true,
							keyboard: [...keywords, [{ text: '⬅️ Orqaga' }]],
						},
					});
				}
			}
		});

		// 	PRODUCTS

		responseProducts.data.forEach(async item => {
			if (msg.text === item.product_name) {
				const response = await OrderService.getAllProsucts();

				const existProducts = response.data.find(data => data.product_name == item.product_name);

				const keywords = getSubProductKeys(existProducts.subProducts);

				const image = createReadStream(resolve('uploads', 'category.jpeg'));
				if (keywords) {
					bot.sendPhoto(msg.from.id, image, {
						caption: `👋 🌯 ${item.product_name} to'plami boyicha ${existProducts.subProducts.length} ta mahsulotlar topildi.
						
			
			📲	Buyurtma berish uchun 🔽 birini tanlang :)`,
						reply_markup: {
							resize_keyboard: true,
							one_time_keyboard: true,
							remove_keyboard : true,
							keyboard: [...keywords, [{ text: '⬅️ Orqaga' }]],
						},
					});
				}
			}
		});

		// SUBPRODUCTS

		subProduct?.data?.forEach(async item => {
			if (msg.text === item.sub_product_name) {
				let count = 1;
				const response = await OrderService.getAllSubProducts();

				const existSubCategory = response.data.find(
					data => data.sub_product_name == item.sub_product_name
				);
				console.log(existSubCategory);

				bot.sendPhoto(msg.from.id, existSubCategory.image, {
					caption: `Nomi : ${item.sub_product_name} \nNarxi : ${item.price} $ \nTavsif : ${item.description}`,
					reply_markup: {
						resize_keyboard: true,
						one_time_keyboard: true,
						remove_keyboard : true,
						inline_keyboard: [
							[
								{
									text: '➖',
									callback_data: 'add',
								},
								{
									text: `${count}`,
									callback_data: 'add',
								},
								{
									text: '➕',
									callback_data: 'remove',
								},
							],
							[
								{
									text: "🛒 Savatga qo'shish",
									callback_data: "savatga qo'shish",
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
				});
			}
		});

		// ORQADA BUTTON

		if (msg.text == '⬅️ Orqaga') {
			const text = ` 👋 🚀 Buyurtmani birga joylashtiramizmi? 🤗
	
			Buyurtma berish uchun 🔽 birini tanlang :)
			`;

			bot.sendMessage(chatId, text, {
				reply_markup: {
					resize_keyboard: true,
					one_time_keyboard: true,
					keyboard: StartKeyWords,
				},
			});
		}
	});
}
