import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Snackbar, Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCartContext } from '../context/CartContext';
import ProductDetail from '../components/product/ProductDetail';
import { useProductContext } from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const { fetchProduct, singleProduct } = useProductContext();
    const { addToCart } = useCartContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetProduct = async () => {
            if (id) {
                await fetchProduct(id);
                setLoading(false);
            }
        };
        fetchAndSetProduct();
    }, [id, fetchProduct]);

    const handleAddToCart = useCallback(() => {
        if (!singleProduct) return;
        if (!selectedColor || !selectedSize) {
            setShowSnackbar(true);
            return;
        }

        const cartItem = {
            product: singleProduct,
            quantity,
            selectedColor,
            selectedSize,
        };
        addToCart(cartItem);
        setShowSnackbar(false);
        navigate(`/products`);
    }, [singleProduct, quantity, selectedColor, selectedSize, addToCart, navigate]);


    const productDetailProps = useMemo(() => ({
        product: singleProduct,
        selectedColor,
        selectedSize,
        onSelectColor: setSelectedColor,
        onSelectSize: setSelectedSize,
        quantity,
        onQuantityChange: setQuantity,
        onAddToCart: handleAddToCart,
    }), [singleProduct, selectedColor, selectedSize, quantity, handleAddToCart]);

    return (
        <Box sx={{ padding: 2 }}>
            <IconButton onClick={() => navigate(-1)} aria-label="go back">
                <ArrowBackIcon />
            </IconButton>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                singleProduct && (
                    <ProductDetail {...productDetailProps} />
                )
            )}

            <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)}>
                <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                    Please choose the color and size before adding the product to the cart!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductDetailPage;
