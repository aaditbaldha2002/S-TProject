import { CartItem } from '../component/ProductListing';
export type InitState = {
  products: { [key: string]: CartItem };
  totalPrice: number;
  totalItems: number;
};

const initState: InitState = {
  products: {},
  totalPrice: 0 as number,
  totalItems: 0 as number,
};

export default initState;
