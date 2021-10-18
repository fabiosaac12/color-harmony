import { createContext } from 'react';
import { AvailableThemes } from './models/AvailableThemes';
import { HSL } from './models/HSL';
import { Theme } from './models/Theme';

export interface ThemeContextProps {
  theme: Theme;
  generateTheme: () => void;
  hsl: HSL;
  handleSetHsl: ({ h, s, l }: Partial<HSL>) => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);
