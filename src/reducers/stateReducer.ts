import { Product } from '../App';
import { CartItem } from '../component/ProductListing';
import { InitState } from '../state/state';

export type ActionType = {
  type: string;
  payload: CartItem | string;
};

const stateReducer = (state: InitState, action: ActionType): InitState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      const add_item = action.payload as CartItem;
      if (state.products[add_item.id]) {
        console.log(state.products);
        return {
          ...state,
          products: {
            ...state.products,
            [add_item.id]: {
              ...state.products[add_item.id],
              quantity:
                state.products[add_item.id].quantity + add_item.quantity,
            },
          },
          totalPrice: state.totalPrice + add_item.quantity * add_item.price,
          totalItems: state.totalItems + add_item.quantity,
        };
      } else {
        console.log(state.products);
        return {
          ...state,
          products: {
            ...state.products,
            [(action.payload as CartItem).id]: action.payload as CartItem,
          },
          totalPrice:
            state.totalPrice +
            (action.payload as CartItem).quantity *
              (action.payload as CartItem).price,
          totalItems: state.totalItems + (action.payload as CartItem).quantity,
        };
      }

    case 'UPDATE_PRODUCT':
      const updateProduct = action.payload;
      const newTotalPrice =
        state.totalPrice +
        ((updateProduct as CartItem).quantity *
          (updateProduct as CartItem).price -
          state.products[(updateProduct as CartItem).id].quantity *
            state.products[(updateProduct as CartItem).id].price);
      console.log(state.products);
      return {
        ...state,
        products: {
          ...state.products,
          [(updateProduct as CartItem).id]: updateProduct as CartItem,
        },
        totalPrice: newTotalPrice,
        totalItems:
          state.totalItems +
          ((updateProduct as CartItem).quantity -
            state.products[(updateProduct as CartItem).id].quantity),
      };

    case 'DELETE_PRODUCT':
      const deleteProduct = action.payload as CartItem;
      const newTotalItems =
        state.totalItems - state.products[deleteProduct.id].quantity;
      const newDeleteTotalPrice =
        state.totalPrice -
        state.products[deleteProduct.id].quantity *
          state.products[deleteProduct.id].price;
      delete state.products[(action.payload as CartItem).id];

      return {
        ...state,
        totalPrice: newDeleteTotalPrice,
        totalItems: newTotalItems,
      };
    default:
      return state;
  }
};

export default stateReducer;
