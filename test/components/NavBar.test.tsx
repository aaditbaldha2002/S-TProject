import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../src/component/NavBar';
import 'jest-styled-components';

describe('NavBar Component', () => {
  const mockOnClick = jest.fn();

  test('renders the NavBar with the correct number of items', () => {
    const items = 5;

    render(<NavBar items={items} onClick={mockOnClick} />);

    // Check if the Cart title is rendered
    expect(screen.getByText('Cart')).toBeInTheDocument();

    // Check if the number of items is displayed
    expect(screen.getByText(items.toString())).toBeInTheDocument();
  });

  test('calls onClick function when the Cart is clicked', () => {
    const items = 5;

    render(<NavBar items={items} onClick={mockOnClick} />);

    // Click on the Cart
    fireEvent.click(screen.getByText('Cart'));

    // Check if onClick function was called
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('renders correctly with 0 items in the cart', () => {
    const items = 0;

    render(<NavBar items={items} onClick={mockOnClick} />);

    // Check if the number of items is 0
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('NavBar element has the correct class styles', () => {
    const items = 5;

    const { container } = render(
      <NavBar items={items} onClick={mockOnClick} />,
    );

    // Check that the wrapper has the correct background color
    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveStyleRule('background: #000000'); // Assuming black is the hex color for black
  });

  test('Cart is clickable and cursor changes on hover', () => {
    const items = 5;

    render(<NavBar items={items} onClick={mockOnClick} />);

    const cart = screen.getByText('Cart').parentElement;
    expect(cart).toBeTruthy();

    // Simulate hover
    fireEvent.mouseOver(cart!);

    // Ensure the hover effect is applied using jest-styled-components
    expect(cart).toHaveStyleRule('cursor', 'pointer', {
      modifier: '&:hover',
    });
  });

  test('Cart is clickable and onClick is called', () => {
    const items = 3;
    render(<NavBar items={items} onClick={mockOnClick} />);

    const cart = screen.getByText('Cart').parentElement;

    fireEvent.click(cart!);
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });
});
