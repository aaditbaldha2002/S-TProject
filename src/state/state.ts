import { Product } from '../App';
export type InitState = {
  products: { [key: string]: Product };
  totalPrice: number;
};

const initState: InitState = {
  products: {},
  totalPrice: 0 as number,
};

export default initState;
