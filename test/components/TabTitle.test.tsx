// TabTitle.test.tsx
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import TabTitle from '../../src/component/TabTitle';
import '@testing-library/jest-dom';

beforeEach(() => cleanup);

describe('TabTitle Component', () => {
  test('renders text correctly when "cart" is not included', () => {
    render(<TabTitle text="All Products" />);

    // Check if the text renders correctly
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  test('renders "Your Cart" when text contains "cart"', () => {
    render(<TabTitle text="Shopping Cart" />);

    // Check if the text "Your Cart" is displayed
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });

  test('handles case insensitivity for "cart" in text', () => {
    render(<TabTitle text="Shopping cart" />);

    // Check if the text "Your Cart" is displayed, even when "cart" is lowercase
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    cleanup();
    render(<TabTitle text="Cart Items" />);

    // Check if the text "Your Cart" is displayed, even when "Cart" is capitalized
    expect(screen.getByText('Your Cart')).toBeTruthy();
  });

  test('renders original text when "cart" is not present', () => {
    render(<TabTitle text="Featured Products" />);

    // Check if the original text "Featured Products" is rendered
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
  });
});
