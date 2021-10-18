import { getRandomInt } from 'providers/Theme/helpers/getRandomInt';
import React, { useEffect, useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { AvailableThemes } from './models/AvailableThemes';
import { HSL } from './models/HSL';
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
  const [hsl, setHsl] = useState<HSL>({
    h: { value: 0, locked: false },
    s: { value: 0, locked: false },
    l: { value: theme.name === 'light' ? 99 : 11, locked: false },
  });

  useEffect(() => {
    const { h, s, l } = hsl;

    const color = `hsl(${h.value}, ${s.value}%, ${l.value}%)`;

    const contrastText = l.value > 65 ? '#282828' : '#fcfcfc';

    setTheme((theme) => ({
      ...theme,
      name: l.value > 65 ? 'light' : 'dark',
      palette: {
        ...theme.palette,
        primary: color,
        background: color,
        text: contrastText,
      },
    }));
  }, [hsl]);

  const handleSetHsl = ({ h, s, l }: Partial<HSL>) => {
    setHsl(({ h: _h, s: _s, l: _l }) => ({
      h: h ?? _h,
      s: s ?? _s,
      l: l ?? _l,
    }));
  };

  const generateTheme = () => {
    const h = getRandomInt(0, 360);
    const s = getRandomInt(0, 100);
    const l = getRandomInt(0, 100);

    handleSetHsl({
      h: hsl.h.locked ? undefined : { value: h, locked: false },
      s: hsl.s.locked ? undefined : { value: s, locked: false },
      l: hsl.l.locked ? undefined : { value: l, locked: false },
    });
  };

  const contextValue: ThemeContextProps = {
    theme,
    generateTheme,
    handleSetHsl,
    hsl,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </ThemeContext.Provider>
  );
};
