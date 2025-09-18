export type Cart = {
  totalItems: number;
  totalSum: number;
  items: CartItem[];
};

export type CartItem = {
  itemCount: number;
  itemType: ShopItem;
};

export type Order = {
  items: CartItem[];
  timestamp: Date;
  sender: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: UserAddress[];
};

export type UserAddress = {
  id: number;
  user_id: number;
  settlement: string;
  street: string;
  house: string;
  floor: string;
  entrance: string;
  apartment: string;
};

export const defaultAddress = () => {
  return {} as UserAddress;
};

export type Service = {
  name: string;
  description: string;
  imageUrl: string;
};

export type PaginatedItemList<T> = {
  totalPages: number;
  currentPage: number;
  items: T[];
};

export type ShopItem = {
  id: string;
  title: string;
  description: string;
  priceInEuro: number;
  imgUrl: string;
  inStock: boolean;
  hotPrice?: HotPriceDetails;
};

export type ServerProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  rating: number;
  category_id: number;
  in_stock: boolean;
};

export type HotPriceDetails = {
  oldPrice: number;
  newPrice: number;
};

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};
