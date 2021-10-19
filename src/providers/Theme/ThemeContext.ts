import { createContext } from 'react';
import { HSLValue } from './models/HSLValue';
import { Theme } from './models/Theme';

export interface ThemeContextProps {
  theme: Theme;
  generateTheme: () => void;
  hsl: HSLValue;
  handleSetHsl: ({ h, s, l }: Partial<HSLValue>) => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);
