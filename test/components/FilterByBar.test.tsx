import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterByBar from '../../src/component/FilterByBar';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { renderWithTheme } from './test-utils';

describe('FilterByBar', () => {
  const mockOnClick = jest.fn();

  test('renders all tabs when activeTab is not "Cart"', () => {
    const activeTab = 'All Products';
    renderWithTheme(
      <FilterByBar activeTab={activeTab} onClick={mockOnClick} />,
    );

    // Check for the "Filter By:" title
    expect(screen.getByText('Filter By:')).toBeInTheDocument();

    // Check if all tabs are rendered
    ['All Products', 'Accessory', 'Laptop', 'Mobile', 'Tablet'].forEach(
      (tabName) => {
        expect(screen.getByText(tabName)).toBeInTheDocument();
      },
    );

    // Check that the correct tab is active (styled differently if active)
    const activeTabElement = screen.getByText('All Products');
    expect(activeTabElement).toHaveStyleRule('background', '#4f7f99'); // Assuming there's a class for active tab (you can change this based on your actual implementation)
  });

  test('renders "Go Back" tab when activeTab is "Cart"', () => {
    const activeTab = 'Cart';
    renderWithTheme(
      <FilterByBar activeTab={activeTab} onClick={mockOnClick} />,
    );

    // Check that the "Go Back" tab is rendered
    expect(screen.getByText('Go Back')).toBeInTheDocument();

    // Check that the "Go Back" tab triggers the onClick function when clicked
    fireEvent.click(screen.getByText('Go Back'));
    expect(mockOnClick).toHaveBeenCalledWith('All Products');
  });

  test('clicking a tab calls onClick with the correct argument', () => {
    const activeTab = 'Accessory';
    renderWithTheme(
      <FilterByBar activeTab={activeTab} onClick={mockOnClick} />,
    );

    // Click on the "Laptop" tab
    fireEvent.click(screen.getByText('Laptop'));

    // Ensure onClick was called with the correct tab name
    expect(mockOnClick).toHaveBeenCalledWith('Laptop');
  });

  test('renders correct active tab', () => {
    const activeTab = 'Mobile';
    renderWithTheme(
      <FilterByBar activeTab={activeTab} onClick={mockOnClick} />,
    );

    // Check that the active tab is highlighted (this assumes there is a class for active tab)
    const activeTabElement = screen.getByText('Mobile');
    expect(activeTabElement).toHaveStyleRule('background', '#4f7f99'); // Adjust according to your styling logic
  });
});
