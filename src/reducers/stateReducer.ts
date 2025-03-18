import { Product } from '../App';
import { InitState } from '../state/state';

const stateReducer = (
  state: InitState,
  action: { type: string; payload: any },
): InitState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: { ...state.products, [action.payload.id]: action.payload },
        totalPrice:
          state.totalPrice + action.payload.quantity * action.payload.price,
      };
    case 'UPDATE_PRODUCT':
      const updateProduct = action.payload;
      const newTotalPrice =
        state.totalPrice +
        (updateProduct.quantity * updateProduct.price -
          state.products[updateProduct.id].quantity *
            state.products[updateProduct.id].price);
      return {
        ...state,
        products: { ...state.products, [updateProduct.id]: updateProduct },
        totalPrice: newTotalPrice,
      };

    case 'DELETE_PRODUCT':
      delete state.products[action.payload.id];
      return {
        ...state,
        totalPrice:
          state.totalPrice - action.payload.quantity * action.payload.price,
      };
    default:
      return state;
  }
};

export default stateReducer;
