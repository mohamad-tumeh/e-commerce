import axios, { AxiosResponse } from 'axios';
import { Product } from '../models/Product';

const API_URL = 'http://localhost:3001/products';

export const getProducts = async (page: number, limit: number): Promise<AxiosResponse<Product[]>> => {
    return await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
};

export const fetchProduct = async (id: string): Promise<Product> => {
    const response = await axios.get(`${API_URL}/${id}`);
    if (!response.data) {
        throw new Error('Product not found');
    }
    return response.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
    const response = await axios.post(API_URL, product);
    return response.data;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
    const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
