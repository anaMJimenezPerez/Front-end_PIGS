import { Product } from "./product";
import { User } from "./user";


export interface Cart {
  id: number;
  user: User;
  product: Product;
  amount: number;
}
