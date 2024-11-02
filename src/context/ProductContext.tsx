import { createContext, useContext, ReactNode, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../models/Product';

interface ProductContextType {
    products: Product[];
    filteredProducts: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: (page: number) => Promise<void>;
    fetchProduct: (id: string) => Promise<void>;
    singleProduct: Product | null;
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (updatedProduct: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    setSearchTerm: (term: string) => void;
    setSelectedCategory: (category: string) => void;
    setMinPrice: (price: string) => void;
    setMaxPrice: (price: string) => void;
    totalProductsCount: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({ children }: { children: ReactNode }) => {
    const { products, filteredProducts, loading, error, fetchProducts, fetchProduct, singleProduct, addProduct, updateProduct, deleteProduct, totalProductsCount, setSearchTerm, setSelectedCategory, setMinPrice, setMaxPrice } = useProducts();

    return (
        <ProductContext.Provider value={{ products, filteredProducts, loading, error, fetchProducts, fetchProduct, singleProduct, addProduct, updateProduct, deleteProduct, totalProductsCount, setSearchTerm, setSelectedCategory, setMinPrice, setMaxPrice }}>
            {children}
        </ProductContext.Provider>
    );
};

const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

export { ProductProvider, useProductContext };
