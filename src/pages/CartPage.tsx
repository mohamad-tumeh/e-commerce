import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useCartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartContext();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography sx={{ textAlign: 'center', mt: 5, color: 'gray' }}>No items in cart</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map(item => (
                                <TableRow key={item.product.id}>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell>{item.selectedColor}</TableCell>
                                    <TableCell>{item.selectedSize}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <IconButton onClick={() => updateQuantity(item.product.id, Math.max(item.quantity - 1, 1))} color="primary">
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                            <IconButton onClick={() => updateQuantity(item.product.id, item.quantity + 1)} color="primary">
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => removeFromCart(item.product.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {cartItems.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button variant="contained" color="primary" size="large" onClick={handleCheckout}>
                        Checkout
                    </Button>
                    <Button variant="outlined" color="secondary" size="large" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CartPage;
