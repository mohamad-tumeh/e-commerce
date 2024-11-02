import axios from 'axios';
import { Category } from '../models/Category';

const API_URL = 'http://localhost:3001/categories';

export const getCategories = async (): Promise<Category[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addCategory = async (category: Category): Promise<Category> => {
    const response = await axios.post(API_URL, category);
    return response.data;
};

export const editCategory = async (categoryId: string, updatedData: Partial<Category>): Promise<Category> => {
    const response = await axios.put(`${API_URL}/${categoryId}`, updatedData);
    return response.data;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
    await axios.delete(`${API_URL}/${categoryId}`);
};
