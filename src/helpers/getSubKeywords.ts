import { ISingleSubCategory } from '../interfaces/order-interfaces';

interface IResponse {
	text: string;
}

export const getSubKeywords = (data: ISingleSubCategory[]): IResponse[][] => {
	const keywords = data.map(item => {
		let group = [];
		const key = {
			text: item.sub_category_name,
		};
		group.push(key);

		return group;
	});
	return keywords;
};
