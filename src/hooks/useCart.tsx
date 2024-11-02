
import { useState } from 'react';
import { CartItem } from '../models/CartItem';
import * as CartService from '../services/CartService';

export const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => setCartItems(prevItems => CartService.addToCart(prevItems, item));
    const removeFromCart = (id: string) => setCartItems(prevItems => CartService.removeFromCart(prevItems, id));
    const updateQuantity = (id: string, quantity: number) => setCartItems(prevItems => CartService.updateQuantity(prevItems, id, quantity));
    const clearCart = () => setCartItems(CartService.clearCart());

    return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart };
};
