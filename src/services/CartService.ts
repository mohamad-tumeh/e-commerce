
import { CartItem } from '../models/CartItem';

export const addToCart = (cartItems: CartItem[], item: CartItem): CartItem[] => {
    const existingItem = cartItems.find(cartItem => cartItem.product.id === item.product.id);
    if (existingItem) {
        return cartItems.map(cartItem =>
            cartItem.product.id === item.product.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
        );
    }
    return [...cartItems, item];
};

export const removeFromCart = (cartItems: CartItem[], id: string): CartItem[] => {
    return cartItems.filter(item => item.product.id !== id);
};

export const updateQuantity = (cartItems: CartItem[], id: string, quantity: number): CartItem[] => {
    return cartItems.map(item => 
        item.product.id === id ? { ...item, quantity } : item
    );
};

export const clearCart = (): CartItem[] => [];
