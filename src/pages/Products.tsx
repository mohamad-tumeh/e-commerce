import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, Typography, MenuItem, Select, InputAdornment } from '@mui/material';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useCategoryContext } from '../context/CategoryContext ';

const Products: React.FC = () => {
    const { products } = useProductContext();
    const { categories, loading: categoriesLoading } = useCategoryContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.categoryId === selectedCategory : true) &&
            (minPrice ? product.price >= Number(minPrice) : true) &&
            (maxPrice ? product.price <= Number(maxPrice) : true)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, minPrice, maxPrice, products]);

    return (
        <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
                Available Products
            </Typography>

            {/* Filter Controls */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& .MuiTextField-root, .MuiSelect-root': { minWidth: '200px', bgcolor: 'white', borderRadius: 1 },
                }}
            >
                <TextField
                    label="Search Products"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    sx={{ fontWeight: selectedCategory ? 'normal' : 'lighter' }}
                >
                    <MenuItem value="">
                        <em>All Categories</em>
                    </MenuItem>
                    {categoriesLoading ? (
                        <MenuItem disabled>Loading...</MenuItem>
                    ) : (
                        categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))
                    )}
                </Select>

                {/* Price Filters */}
                <TextField
                    label="Min Price"
                    variant="outlined"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Max Price"
                    variant="outlined"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="textSecondary">
                        No products found for the selected filters. Try adjusting the filters or search criteria.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Products;
