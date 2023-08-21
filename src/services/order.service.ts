import axios from '../config/api.config';
import {
	IGetAllProducts,
	IGetAllSubProducts,
	IGetOrderResponse,
	IGetSubCategory,
} from '../interfaces/order-interfaces';

export const OrderService = {
	async getALlCategories() {
		try {
			const response = await axios.get<IGetOrderResponse>('categories');
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
};
