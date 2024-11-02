import { useState } from 'react';
import { Category } from '../models/Category';
import { getCategories, addCategory as addCategoryService, editCategory as editCategoryService, deleteCategory as deleteCategoryService } from '../services/categoryService';

const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async (): Promise<Category[]> => {
        setLoading(true);
        try {
            const categories = await getCategories();
            setCategories(categories);
            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (category: Category) => {
        try {
            const newCategory = await addCategoryService(category);
            setCategories((prev) => [...prev, newCategory]);
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const editCategory = async (categoryId: string, updatedData: Partial<Category>) => {
        try {
            const updatedCategory = await editCategoryService(categoryId, updatedData);
            setCategories((prev) =>
                prev.map((category) => (category.id === categoryId ? updatedCategory : category))
            );
        } catch (error) {
            console.error("Error editing category:", error);
        }
    };

    const deleteCategory = async (categoryId: string) => {
        try {
            await deleteCategoryService(categoryId);
            setCategories((prev) => prev.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return { categories, loading, addCategory, fetchCategories, editCategory, deleteCategory };
};

export default useCategory;
