import { getRandomInt } from 'providers/Theme/helpers/getRandomInt';
import React, { useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { AvailableThemes } from './models/AvailableThemes';
import { Theme } from './models/Theme';
import { ThemeContext, ThemeContextProps } from './ThemeContext';
import { themes } from './themes';

interface Props {
  defaultTheme: AvailableThemes;
}

export const ThemeProvider: React.FC<Props> = ({
  children,
  defaultTheme = 'light',
}) => {
  const [theme, setTheme] = useState<Theme>(
    themes[Appearance.getColorScheme() || defaultTheme],
  );

  const generateTheme = () => {
    const h = getRandomInt(0, 360);
    const s = getRandomInt(0, 100);
    const l = getRandomInt(0, 100);

    const randomColor = `hsl(${h}, ${s}%, ${l}%)`;

    const contrastText = l > 70 ? '#000000' : '#ffffff';

    setTheme((theme) => ({
      ...theme,
      name: l > 70 ? 'light' : 'dark',
      palette: {
        ...theme.palette,
        primary: randomColor,
        background: randomColor,
        text: contrastText,
      },
    }));
  };

  const contextValue: ThemeContextProps = {
    theme,
    generateTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar
        animated
        translucent
        backgroundColor="transparent"
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
};
