// SubTotal.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SubTotal from '../../src/component/SubTotal';

describe('SubTotal Component', () => {
  test('renders total price and total items correctly', () => {
    render(<SubTotal totalPrice={100.55} totalItems={5} />);

    // Check if the Total Price and Total Items are displayed correctly
    expect(screen.getByText('Total Price: 100.55')).toBeInTheDocument();
    expect(screen.getByText('Total Items: 5')).toBeInTheDocument();
  });

  test('formats total price to two decimal places', () => {
    render(<SubTotal totalPrice={99.9} totalItems={3} />);

    // Ensure that total price is displayed with two decimal places
    expect(screen.getByText('Total Price: 99.90')).toBeInTheDocument();
  });

  test('renders empty subtotal with zero values', () => {
    render(<SubTotal totalPrice={0} totalItems={0} />);

    // Check if total price and total items display zero values
    expect(screen.getByText('Total Price: 0.00')).toBeInTheDocument();
    expect(screen.getByText('Total Items: 0')).toBeInTheDocument();
  });
});
