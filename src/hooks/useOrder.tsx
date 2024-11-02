import { useState } from 'react';
import { CartItem } from '../models/CartItem';
import { saveOrder as saveOrderService } from '../services/OrderService';

export const useOrder = () => {
    const [isPaid, setIsPaid] = useState(false);

    const saveOrder = async (cartItems: CartItem[], totalAmount: number) => {
        const success = await saveOrderService(cartItems, totalAmount);
        setIsPaid(success);
    };

    return { isPaid, saveOrder };
};
