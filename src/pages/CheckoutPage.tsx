import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, Paper, Alert } from '@mui/material';
import { useCartContext } from '../context/CartContext';
import { saveOrder } from '../services/OrderService';
import { useNavigate } from 'react-router-dom';
import { calculateTotalAmount } from '../utils/orderUtils';

const CheckoutPage: React.FC = () => {
    const { cartItems, clearCart } = useCartContext();
    const [isPaid, setIsPaid] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setTotalAmount(calculateTotalAmount(cartItems));
    }, [cartItems]);

    const handlePayment = async () => {
        const amount = calculateTotalAmount(cartItems);
        const paymentSuccessful = await saveOrder(cartItems, amount);
        setTotalAmount(calculateTotalAmount(cartItems));

        if (paymentSuccessful) {
            setIsPaid(true); 
            clearCart();
        }
    };

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper sx={{ p: 3, width: '100%', maxWidth: 500 }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Checkout
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Order Summary:</Typography>
                    {cartItems.map(item => (
                        <Box key={item.product.id} sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                            <Typography>{item.product.name}</Typography>
                            <Typography>{item.quantity} x {item.product.price} SAR</Typography>
                        </Box>
                    ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6">Total Amount:</Typography>
                    <Typography variant="h6">{totalAmount} SAR</Typography>
                </Box>
                
                {!isPaid ? (
                    <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
                        Pay Now
                    </Button>
                ) : (
                    <Alert severity="success" sx={{ mt: 2 }}>Payment Successful! Thank you for your purchase.</Alert>
                )}
            </Paper>
            {isPaid && (
                <Button variant="outlined" color="primary" sx={{ mt: 3 }} onClick={() => navigate('/products')}>
                    Continue Shopping
                </Button>
            )}
        </Box>
    );
};

export default CheckoutPage;
