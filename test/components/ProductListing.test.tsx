import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ProductListing from '../../src/component/ProductListing';
import { Product } from '../../src/App';
import { ActionType } from '../../src/reducers/stateReducer';

beforeEach(() => cleanup());
// Mock the Dispatch function
const mockDispatch = jest.fn();

describe('ProductListing Component', () => {
  const product: Product = {
    id: 'mockId',
    name: 'Test Product',
    group: 'Laptop',
    msrp: 1000,
    price: 800,
    status: 'Available',
  };

  const cartItem = {
    ...product,
    quantity: 2,
  };

  test('renders product details correctly', () => {
    render(
      <ProductListing item={product} type="Search" dispatch={mockDispatch} />,
    );

    // Check if product name, price, and group are displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('800$')).toBeInTheDocument();
    expect(screen.getByText('1000$')).toBeInTheDocument();
  });

  test('renders quantity input and update functionality for search type', () => {
    render(
      <ProductListing item={product} type="Search" dispatch={mockDispatch} />,
    );

    // Check if quantity input is rendered
    const quantityInput = screen.getByRole('spinbutton');
    expect(quantityInput).toBeInTheDocument();

    // Change the quantity
    fireEvent.change(quantityInput, { target: { value: '3' } });
    expect(quantityInput).toHaveValue(3);
  });

  test('clicking on "Add to Cart" calls handlePurchase function', () => {
    render(
      <ProductListing item={product} type="Search" dispatch={mockDispatch} />,
    );

    // Find the purchase button and click it
    const purchaseButton = screen.getByText('Add to Cart');
    fireEvent.click(purchaseButton);

    // Ensure the dispatch function is called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_PRODUCT',
      payload: { ...product, quantity: 1 },
    });
  });

  test('clicking on "Sold Out" button disables it', () => {
    const unavailableProduct = { ...product, status: 'Unavailable' };

    render(
      <ProductListing
        item={unavailableProduct}
        type="Search"
        dispatch={mockDispatch}
      />,
    );

    const purchaseButton = screen.getByText('Sold Out');
    expect(purchaseButton).toBeDisabled();
  });

  test('updating quantity for cart type dispatches correct action', () => {
    render(
      <ProductListing item={cartItem} type="Cart" dispatch={mockDispatch} />,
    );

    const quantityInput = screen.getByRole('spinbutton');

    // Update quantity to 3
    fireEvent.change(quantityInput, { target: { value: '3' } });

    // Ensure the update dispatch is called with correct payload
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_PRODUCT',
      payload: { ...product, quantity: 3 },
    });
  });

  test('quantity input prevents invalid characters', () => {
    render(
      <ProductListing item={product} type="Search" dispatch={mockDispatch} />,
    );

    const quantityInput = screen.getByRole('spinbutton');

    fireEvent.change(quantityInput, { target: { value: 'e' } });

    expect(quantityInput).toHaveValue(null);
  });

  test('quantity input for cart type allows 0 or greater values', () => {
    render(
      <ProductListing item={cartItem} type="Cart" dispatch={mockDispatch} />,
    );

    const quantityInput = screen.getByRole('spinbutton');

    fireEvent.change(quantityInput, { target: { value: '0' } });
    expect(quantityInput).toHaveValue(0);

    fireEvent.change(quantityInput, { target: { value: '-1' } });
    expect(quantityInput).toHaveValue(-1);
  });
});
