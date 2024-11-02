import { Order } from '../models/Order';
import { CartItem } from '../models/CartItem';

export const saveOrder = async (cartItems: CartItem[], totalAmount: number): Promise<boolean> => {
    const order: Order = {
        items: cartItems,
        totalAmount,
        date: new Date().toISOString(),
    };

    try {
        const response = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Failed to save order');
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};
