import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductListing, { CartItem } from '../../src/component/ProductListing';
import { Product } from '../../src/App';
import '@testing-library/jest-dom';
const mockDispatch = jest.fn();

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  group: 'Laptop',
  msrp: 1000,
  price: 900,
  status: 'Available',
};

const mockCartItem: CartItem = {
  ...mockProduct,
  quantity: 2,
};

describe('ProductListing Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly for Search view', () => {
    render(
      <ProductListing
        item={mockProduct}
        type="Search"
        dispatch={mockDispatch}
      />,
    );

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Group:')).toBeInTheDocument();
    expect(screen.getByText('Market Price:')).toBeInTheDocument();
    expect(screen.getByText('Sales Price:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /purchase/i }),
    ).toBeInTheDocument();
  });

  test('dispatches ADD_PRODUCT action on purchase', () => {
    render(
      <ProductListing
        item={mockProduct}
        type="Search"
        dispatch={mockDispatch}
      />,
    );

    const purchaseButton = screen.getByRole('button', { name: /purchase/i });
    fireEvent.click(purchaseButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_PRODUCT',
      payload: { ...mockProduct, quantity: 1 },
    });
  });

  test('dispatches UPDATE_PRODUCT action on quantity change in Cart view', () => {
    render(
      <ProductListing
        item={mockCartItem}
        type="Cart"
        dispatch={mockDispatch}
      />,
    );

    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_PRODUCT',
      payload: { ...mockCartItem, quantity: 3 },
    });
  });

  test('dispatches DELETE_PRODUCT when quantity is zero in Cart view', () => {
    render(
      <ProductListing
        item={mockCartItem}
        type="Cart"
        dispatch={mockDispatch}
      />,
    );

    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '0' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DELETE_PRODUCT',
      payload: { ...mockCartItem, quantity: 1 },
    });
  });

  test('disables purchase button when product is unavailable', () => {
    const unavailableProduct = { ...mockProduct, status: 'Unavailable' };
    render(
      <ProductListing
        item={unavailableProduct}
        type="Search"
        dispatch={mockDispatch}
      />,
    );

    const purchaseButton = screen.getByRole('button', { name: /sold out/i });
    expect(purchaseButton).toBeDisabled();
  });
});
