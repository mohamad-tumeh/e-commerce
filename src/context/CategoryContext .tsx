import React, { createContext, useContext, useEffect } from 'react';
import { Category } from '../models/Category';
import useCategory from '../hooks/useCategories';

interface CategoryContextType {
    categories: Category[];
    loading: boolean;
    addCategory: (category: Category) => void;
    fetchCategories: () => Promise<Category[]>;
    editCategory: (categoryId: string, updatedData: Partial<Category>) => void;
    deleteCategory: (categoryId: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { categories, loading, addCategory, fetchCategories, editCategory, deleteCategory } = useCategory();

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading, addCategory, fetchCategories, editCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }
    return context;
};

export { CategoryProvider, useCategoryContext };
