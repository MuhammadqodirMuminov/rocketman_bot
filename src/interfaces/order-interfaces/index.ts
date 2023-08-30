export interface ISingleSubCategory {
	_id: string;
	sub_category_name: string;
	location: string;
	long: string;
	lang: string;
	status: boolean;
	category: string[];
	products: [];
	created_at: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISingleCategory {
	_id: string;
	category_name: string;
	created_at: Date;
	status: boolean;
	subCategories: ISingleSubCategory[];
	createdAt: Date;
	updatedAt: Date;
}

export interface ISingleProduct {
	product_name: string;
	status: boolean;
	sub_category: string[];
	subProducts: [];
	created_at: Date;
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISingleSubProduct {
	_id: string;
	sub_product_name: string;
	description: string;
	status: boolean;
	price: number;
	image: string;
	product: string[];
	created_at: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISingleProducts {
	_id: string;
	product_name: string;
	status: boolean;
	sub_category: string[];
	subProducts: ISingleSubProduct[];
	created_at: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGetOrderResponse {
	status: number;
	message: string;
	data: ISingleCategory[];
}

export interface IGetSubCategory {
	status: number;
	message: string;
	data: ISingleSubCategory[];
}

export interface IGetAllSubProducts {
	status: number;
	message: string;
	data: ISingleSubProduct[];
}

export interface IGetAllProducts {
	status: number;
	message: string;
	data: ISingleProducts[];
}

export interface IGetSingleSubProductById {
	status: number;
	message: string;
	data: ISingleSubProduct;
}