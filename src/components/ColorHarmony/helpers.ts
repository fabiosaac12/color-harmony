import { HSL } from './models/HSL';

export const getPositiveHue = (hue: number) => {
  let positiveHue = hue;

  while (positiveHue < 0) {
    positiveHue += 360;
  }

  return positiveHue;
};

export const getComplementary = ({ h, s, l }: HSL) => {
  const complementary: HSL[] = [{ h: h - 180, s, l }];

  return complementary;
};

export const getAnalogous = ({ h, s, l }: HSL) => {
  const analogous: HSL[] = [
    { h: h - 30, s, l },
    { h: h + 30 - 360, s, l },
  ];

  return analogous;
};

export const getTriadic = ({ h, s, l }: HSL) => {
  const triadic: HSL[] = [
    { h: h - 120, s, l },
    { h: h + 120 - 360, s, l },
  ];

  return triadic;
};

export const getSplitComplementary = (hsl: HSL) => {
  const complementary = getComplementary(hsl);
  const complementaryAnalogous = getAnalogous(complementary[0]);

  return complementaryAnalogous;
};
