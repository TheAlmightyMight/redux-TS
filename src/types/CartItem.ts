import { ProductItem } from "./ProductItem";

interface CartItem extends ProductItem {
  quantity: number;
}

export type { CartItem };
