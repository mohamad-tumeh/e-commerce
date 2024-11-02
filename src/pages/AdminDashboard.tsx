import React, { useCallback, useMemo, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useProductContext } from '../context/ProductContext';
import AppBarComponent from '../components/dashboard/AppBarComponent';
import DrawerComponent from '../components/dashboard/DrawerComponent';
import MainContent from '../components/dashboard/MainContent';
import { ShoppingCart as ShoppingCartIcon, Category as CategoryIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCategoryContext } from '../context/CategoryContext ';

const AdminDashboard: React.FC = () => {
  const { filteredProducts, totalProductsCount, setSearchTerm, setSelectedCategory, setMinPrice, setMaxPrice } = useProductContext();
  const { categories } = useCategoryContext();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTermState] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState<string>('');
  const [minPrice, setMinPriceState] = useState<string>('');
  const [maxPrice, setMaxPriceState] = useState<string>('');

  const handleOpenProductDialog = () => setOpenProductDialog(true);
  const handleCloseProductDialog = () => setOpenProductDialog(false);
  const handleCloseDetailDialog = () => setOpenDetailDialog(false);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = useCallback((item: any) => {
    setSelectedItem(item);
    setOpenDetailDialog(true);
  }, []);

  const getCategoryName = useCallback((categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'unknown';
  }, [categories]);

  const formattedProducts = useMemo(() => {
    return filteredProducts.map(product => ({
      ...product,
      category: getCategoryName(product.categoryId),
    }));
  }, [filteredProducts, getCategoryName]);

  const productColumns = useMemo(() => [
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'price', label: 'Price' },
    { id: 'category', label: 'Category' },
    {
      id: 'image',
      label: 'Image',
      render: (product: any) => (
        <img src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
      ),
    },
  ], []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const menuItems = useMemo(() => [
    { text: "Products", icon: <ShoppingCartIcon />, action: () => setActiveTab(0) },
    { text: "Categories", icon: <CategoryIcon />, action: () => setActiveTab(1) },
  ], []);

  const handleSearchTermChange = (term: string) => {
    setSearchTermState(term);
    setSearchTerm(term);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryState(categoryId);
    setSelectedCategory(categoryId);
  };

  const handleMinPriceChange = (price: string) => {
    setMinPriceState(price);
    setMinPrice(price);
  };

  const handleMaxPriceChange = (price: string) => {
    setMaxPriceState(price);
    setMaxPrice(price);
  };

  const pagination = {
    page,
    rowsPerPage,
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage
  };

  const dialogState = {
    openProductDialog,
    handleOpenProductDialog,
    handleCloseProductDialog,
    openDetailDialog,
    handleCloseDetailDialog,
    selectedItem,
    handleRowClick
  };

  const filters = {
    searchTerm,
    onSearchTermChange: handleSearchTermChange,
    selectedCategory,
    onCategoryChange: handleCategoryChange,
    minPrice,
    onMinPriceChange: handleMinPriceChange,
    maxPrice,
    onMaxPriceChange: handleMaxPriceChange
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarComponent title="Admin Dashboard" onMenuClick={() => setActiveTab((prev) => (prev === 0 ? 1 : 0))} />
      <DrawerComponent
        onLogout={handleLogout}
        menuItems={menuItems}
      />
      <MainContent
        activeTab={activeTab}
        formattedProducts={formattedProducts}
        productColumns={productColumns}
        totalProductsCount={totalProductsCount}
        pagination={pagination}
        dialogState={dialogState}
        filters={filters}
        categories={categories}
      />
    </Box>
  );
};

export default AdminDashboard;
