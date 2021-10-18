import { createContext } from 'react';
import { AvailableThemes } from './models/AvailableThemes';
import { Theme } from './models/Theme';

export interface ThemeContextProps {
  theme: Theme;
  generateTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);
