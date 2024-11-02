import React, { createContext, useContext, ReactNode } from 'react';
import { CartItem } from '../models/CartItem';
import { useCart } from '../hooks/useCart';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCartContext must be used within a CartProvider');
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const cart = useCart();

    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    );
};
