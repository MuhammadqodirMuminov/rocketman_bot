import { ISingleCategory } from '../interfaces/order-interfaces';

interface IResponse {
	text: string;
}

export const getKeywords = (data: ISingleCategory[]): IResponse[][] => {
	const keywords = data.map(item => {

		let group = [];
		const key = { text: item.category_name };
		group.push(key);

		return group;
	});
	return keywords;
};
