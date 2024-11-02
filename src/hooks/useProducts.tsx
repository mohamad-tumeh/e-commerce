import { useEffect, useState, useCallback } from 'react';
import { Product } from '../models/Product';
import { getProducts, addProduct, updateProduct, deleteProduct, fetchProduct as fetchProductService } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
    const [singleProduct, setSingleProduct] = useState<Product | null>(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');

    const fetchProducts = useCallback(async (page: number = 1, limit: number = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getProducts(page, limit);
            setProducts(response.data);
            setTotalProductsCount(response.data.length);
        } catch (err) {
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchProduct = useCallback(async (id: string) => {
        try {
            const product = await fetchProductService(id);
            setSingleProduct(product);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }, []);

    const filterProducts = useCallback(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.categoryId.toString() === selectedCategory : true) &&
            (minPrice ? product.price >= Number(minPrice) : true) &&
            (maxPrice ? product.price <= Number(maxPrice) : true)
        );
        setFilteredProducts(filtered);
    }, [products, searchTerm, selectedCategory, minPrice, maxPrice]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    const handleAddProduct = async (product: Product) => {
        try {
            const newProduct = await addProduct(product);
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setTotalProductsCount(totalProductsCount + 1);
        } catch (err) {
            setError('Failed to add product. Please try again.');
        }
    };

    const handleUpdateProduct = async (updatedProduct: Product) => {
        try {
            const updated = await updateProduct(updatedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === updated.id ? updated : product))
            );
        } catch (err) {
            setError('Failed to update product. Please try again.');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            setTotalProductsCount(totalProductsCount - 1);
        } catch (err) {
            setError('Failed to delete product. Please try again.');
        }
    };

    return {
        products,
        filteredProducts,
        loading,
        error,
        fetchProducts,
        fetchProduct,
        totalProductsCount,
        addProduct: handleAddProduct,
        updateProduct: handleUpdateProduct,
        deleteProduct: handleDeleteProduct,
        setSearchTerm,
        setSelectedCategory,
        setMinPrice,
        setMaxPrice,
        singleProduct
    };
};
