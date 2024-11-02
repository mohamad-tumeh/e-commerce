import { CartItem } from '../models/CartItem';

export const calculateTotalAmount = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);
};
