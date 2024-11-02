import { Product } from "./Product";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
}
