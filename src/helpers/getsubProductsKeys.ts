import { ISingleSubProduct } from '../interfaces/order-interfaces';

interface IResponse {
	text: string;
}

export const getSubProductKeys = (data: ISingleSubProduct[]): IResponse[][] => {
	const keywords = data.map(item => {
		let group = [];
		const key = {
			text: item.sub_product_name,
		};
		group.push(key);

		return group;
	});
	return keywords;
};
