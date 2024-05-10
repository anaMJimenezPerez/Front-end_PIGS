export interface Product {
  id: number;
  name: string;
  description: string;
  seller_id: number;
  price: number;
  creation_time: string;
  quantity: number;
  tag: number;
  clothingSize: string[];
  typeClothing: string;
  colour: string[];
  typeJewellery: string,
  size: string[],
  typeCeramic: string,
  images_path: string[];
}
