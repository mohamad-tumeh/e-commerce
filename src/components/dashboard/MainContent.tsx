import React, { useCallback, useMemo } from 'react';
import {
    Box,
    Toolbar,
    Typography,
    Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ProductDialog from '../product/ProductDialog';
import CategoryList from '../category/CategoryList';
import UnifiedTable from '../UnifiedTable';
import Filters from '../Filters';

interface MainContentProps {
    activeTab: number;
    formattedProducts: any[];
    productColumns: any[];
    totalProductsCount: number;
    pagination: {
        page: number;
        rowsPerPage: number;
        onChangePage: (event: unknown, newPage: number) => void;
        onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    dialogState: {
        openProductDialog: boolean;
        handleOpenProductDialog: () => void;
        handleCloseProductDialog: () => void;
        openDetailDialog: boolean;
        handleCloseDetailDialog: () => void;
        selectedItem: any;
        handleRowClick: any;
    };
    filters: {
        searchTerm: string;
        onSearchTermChange: (term: string) => void;
        selectedCategory: string;
        onCategoryChange: (categoryId: string) => void;
        minPrice: string;
        onMinPriceChange: (price: string) => void;
        maxPrice: string;
        onMaxPriceChange: (price: string) => void;
    };
    categories: { id: string; name: string }[];
}

const MainContent: React.FC<MainContentProps> = ({
    activeTab,
    formattedProducts,
    productColumns,
    totalProductsCount,
    pagination,
    dialogState,
    filters,
    categories,
}) => {
    const getCategoryName = useCallback((categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : 'unknown';
    }, [categories]);

    const enrichedProducts = useMemo(() => {
        return formattedProducts.map(product => ({
            ...product,
            category: getCategoryName(product.categoryId),
        }));
    }, [formattedProducts, getCategoryName]); 

    const handleOpenProductDialog = () => {
        dialogState.selectedItem = null;  
        dialogState.handleOpenProductDialog();
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {activeTab === 0 ? (
                <>
                    <Typography variant="h4">Products</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenProductDialog} 
                        sx={{ mb: 2 }}
                    >
                        Add Product
                    </Button>

                    <Filters
                        searchTerm={filters.searchTerm}
                        onSearchTermChange={filters.onSearchTermChange}
                        selectedCategory={filters.selectedCategory}
                        onCategoryChange={filters.onCategoryChange}
                        minPrice={filters.minPrice}
                        onMinPriceChange={filters.onMinPriceChange}
                        maxPrice={filters.maxPrice}
                        onMaxPriceChange={filters.onMaxPriceChange}
                        categories={categories}
                    />

                    <UnifiedTable
                        data={enrichedProducts}
                        columns={productColumns}
                        totalCount={totalProductsCount}
                        rowsPerPage={pagination.rowsPerPage}
                        page={pagination.page}
                        onChangePage={pagination.onChangePage}
                        onChangeRowsPerPage={pagination.onChangeRowsPerPage}
                        onRowClick={dialogState.handleRowClick}
                    />

                    <ProductDialog
                        open={dialogState.openProductDialog}
                        onClose={dialogState.handleCloseProductDialog}
                    />

                    <ProductDialog
                        open={dialogState.openDetailDialog}
                        onClose={dialogState.handleCloseDetailDialog}
                        selectedProduct={dialogState.selectedItem}
                    />
                </>
            ) : (
                <CategoryList />
            )}
        </Box>
    );
};

export default MainContent;
