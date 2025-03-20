import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { theme } from '../../src/theme/theme';
export const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};
