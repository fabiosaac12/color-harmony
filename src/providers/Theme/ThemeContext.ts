import { createContext } from 'react';
import { HSLValue } from './models/HSLValue';
import { Theme } from './models/Theme';

export interface ThemeContextProps {
  theme: Theme;
  generateTheme: () => void;
  hsl: HSLValue;
  handleSetHsl: ({ h, s, l }: Partial<HSLValue>) => HSLValue;
  addGenerateThemeCallback: (callback: (hsl: HSLValue) => void) => void;
  runGenerateThemeCallbacks: (newHsl: HSLValue) => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);
