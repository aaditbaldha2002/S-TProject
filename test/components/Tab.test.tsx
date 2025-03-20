// Tab.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tab from '../../src/component/Tab';

describe('Tab Component', () => {
  test('renders Tab with correct name', () => {
    render(<Tab name="Home" onClick={jest.fn()} isActive={false} />);

    // Check if the tab name is rendered correctly
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('applies active background color when isActive is true', () => {
    render(<Tab name="Home" onClick={jest.fn()} isActive={true} />);

    const tabButton = screen.getByText('Home');
    expect(tabButton).toHaveStyle(
      `background: ${expect.stringContaining('selected_blue_gray')}`,
    );
  });

  test('applies inactive background color when isActive is false', () => {
    render(<Tab name="Home" onClick={jest.fn()} isActive={false} />);

    const tabButton = screen.getByText('Home');
    expect(tabButton).toHaveStyle(
      `background: ${expect.stringContaining('dark_gray')}`,
    );
  });

  test('calls onClick function when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Tab name="Home" onClick={mockOnClick} isActive={false} />);

    // Simulate a click event on the Tab
    fireEvent.click(screen.getByText('Home'));

    // Check if the onClick function is called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
