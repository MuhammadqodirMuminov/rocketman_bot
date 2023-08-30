import axios from '../config/api.config';
import {
	IGetAllProducts,
	IGetAllSubProducts,
	IGetOrderResponse,
	IGetSingleSubProductById,
	IGetSubCategory,
} from '../interfaces/order-interfaces';

export const OrderService = {
	async getALlCategories() {
		try {
			const response = await axios.get<IGetOrderResponse>('find/categories');

			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	async getAllSubCategories() {
		try {
			const response = await axios.get<IGetSubCategory>('subcategories');
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	async getAllProsucts() {
		try {
			const response = await axios.get<IGetAllProducts>('products');
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
	async getAllSubProducts() {
		try {
			const response = await axios.get<IGetAllSubProducts>('sub_products');
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async getSubProductById(id: string) {
		const response = await axios.get<IGetSingleSubProductById>(`sub_product/${id}`);
		return response.data;
	},

	async orderNow(body: any) {
		const response = await axios.post(`create/order`, body);
		return response.data
	},
};
