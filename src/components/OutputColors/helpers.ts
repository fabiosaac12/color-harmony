import { CMYK } from './models/CMYK';
import { HEX } from './models/HEX';
import { HSL } from './models/HSL';
import { HSV } from './models/HSV';
import { RGB } from './models/RGB';

export const hslToRgb = ({ h, s, l }: HSL): RGB => {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
};

export const rgbToHex = ({ r, g, b }: RGB): HEX => {
  let rString = r.toString(16);
  let gString = g.toString(16);
  let bString = b.toString(16);

  if (rString.length == 1) rString = '0' + rString;
  if (gString.length == 1) gString = '0' + gString;
  if (bString.length == 1) bString = '0' + bString;

  return { r: rString, g: gString, b: bString };
};

export const rgbToCmyk = ({ r, g, b }: RGB): CMYK => {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, Math.min(m, y));

  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  c = Math.round((isNaN(c) ? 0 : c) * 100);
  m = Math.round((isNaN(m) ? 0 : m) * 100);
  y = Math.round((isNaN(y) ? 0 : y) * 100);
  k = Math.round((isNaN(k) ? 0 : k) * 100);

  return { c, m, y, k };
};

export const hslToHsv = ({ h, ...hsl }: HSL): HSV => {
  const one = (hsl.s * (hsl.l < 50 ? hsl.l : 100 - hsl.l)) / 100;
  const s = Math.round(one === 0 ? 0 : ((2 * one) / (hsl.l + one)) * 100);
  const v = Math.round(hsl.l + one);
  return { h, s, v };
};
