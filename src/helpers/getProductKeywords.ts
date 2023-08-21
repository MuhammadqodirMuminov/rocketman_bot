import { ISingleProduct } from '../interfaces/order-interfaces';

interface IResponse {
	text: string;
}

export const getProductKeys = (data: ISingleProduct[]): IResponse[][] => {
	const keywords = data.map(item => {
		let group = [];
		const key = {
			text: item.product_name,
		};
		group.push(key);

		return group;
	});
	return keywords;
};
