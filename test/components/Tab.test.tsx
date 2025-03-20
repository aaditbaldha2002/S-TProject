import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Tab from '../../src/component/Tab';
import 'jest-styled-components';

const mockTheme = {
  black: '#000000',
  white: '#ffffff',
  dark_gray: '#162733',
};

describe('Tab Component', () => {
  const mockOnClick = jest.fn();

  const renderWithTheme = (ui: React.ReactNode) => {
    return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tab with correct name', () => {
    renderWithTheme(<Tab name="Test Tab" onClick={mockOnClick} />);
    expect(screen.getByText('Test Tab')).toBeInTheDocument();
  });

  test('calls onClick when tab is clicked', () => {
    renderWithTheme(<Tab name="Click Me" onClick={mockOnClick} />);
    const tabButton = screen.getByText('Click Me');

    fireEvent.click(tabButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('has correct styles applied', () => {
    renderWithTheme(<Tab name="Styled Tab" onClick={mockOnClick} />);
    const tabButton = screen.getByRole('button');

    expect(tabButton).toHaveStyleRule('background', mockTheme.black);
    expect(tabButton).toHaveStyleRule('color', mockTheme.white);

    fireEvent.mouseOver(tabButton);
    expect(tabButton).toHaveStyleRule('background', mockTheme.dark_gray);
  });
});
