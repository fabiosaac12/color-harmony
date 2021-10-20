import { getItem, setItem } from 'helpers/localStorage';
import { useDidUpdateEffect } from 'hooks/useDidUpdateEffect';
import React, { useEffect, useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { useThemeGenerator } from './hooks/useThemeGenerator';
import { AvailableThemes } from './models/AvailableThemes';
import { HSLValue } from './models/HSLValue';
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
  const [hsl, setHsl] = useState<HSLValue>({
    h: { value: 0, locked: false },
    s: { value: 0, locked: false },
    l: { value: theme.name === 'light' ? 99 : 11, locked: false },
  });

  const handleSetHsl = ({ h, s, l }: Partial<HSLValue>): HSLValue => {
    const { h: _h, s: _s, l: _l } = hsl;

    const newHsl = {
      h: h ?? _h,
      s: s ?? _s,
      l: l ?? _l,
    };

    setHsl(newHsl);

    return newHsl;
  };

  const { addGenerateThemeCallback, generateTheme } = useThemeGenerator({
    handleSetHsl,
    hsl,
  });

  useEffect(() => {
    (async () => {
      const hsl = await getItem<HSLValue>('hsl');

      hsl && setHsl(hsl);
    })();
  }, []);

  useDidUpdateEffect(() => {
    setItem('hsl', hsl);

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

  const contextValue: ThemeContextProps = {
    theme,
    generateTheme,
    handleSetHsl,
    hsl,
    addGenerateThemeCallback,
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
