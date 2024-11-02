import { CartItem } from './CartItem';

export interface Order {
    id?: string;
    items: CartItem[];
    totalAmount: number;
    date: string;
}
