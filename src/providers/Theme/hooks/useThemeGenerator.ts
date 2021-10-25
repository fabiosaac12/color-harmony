import { useState } from 'react';
import { getRandomInt } from '../helpers/getRandomInt';
import { HSLValue } from '../models/HSLValue';

interface Props {
  hsl: HSLValue;
  handleSetHsl: ({ h, s, l }: Partial<HSLValue>) => HSLValue;
}

export const useThemeGenerator = ({ hsl, handleSetHsl }: Props) => {
  const [generateThemeCallbacks, setGenerateThemeCallbacks] = useState<
    ((hsl: HSLValue) => void)[]
  >([]);

  const runGenerateThemeCallbacks = (newHsl: HSLValue) => {
    for (let callback of generateThemeCallbacks) {
      callback(newHsl);
    }
  };

  const addGenerateThemeCallback = (callback: (hsl: HSLValue) => void) =>
    setGenerateThemeCallbacks((callbacks) => [...callbacks, callback]);

  const generateTheme = () => {
    const h = getRandomInt(0, 360);
    const s = getRandomInt(0, 100);
    const l = getRandomInt(0, 100);

    const newHsl = handleSetHsl({
      h: hsl.h.locked ? undefined : { value: h, locked: false },
      s: hsl.s.locked ? undefined : { value: s, locked: false },
      l: hsl.l.locked ? undefined : { value: l, locked: false },
    });

    runGenerateThemeCallbacks(newHsl);
  };

  return { addGenerateThemeCallback, generateTheme, runGenerateThemeCallbacks };
};
