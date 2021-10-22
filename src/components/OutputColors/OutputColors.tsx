import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Button } from 'components/Button';
import { useTheme } from 'providers/Theme';
import { hslToHsv, hslToRgb, rgbToCmyk, rgbToHex } from './helpers';
import { CMYK } from './models/CMYK';
import { HEX } from './models/HEX';
import { HSL } from './models/HSL';
import { HSV } from './models/HSV';
import { RGB } from './models/RGB';
import { useStyles } from './OutputColorsStyles';
import { useModal } from 'providers/Modal';
import { InfoModal } from 'components/InfoModal';

export const OutputColors = () => {
  const styles = useStyles();
  const modal = useModal();
  const { hsl: _hsl } = useTheme();
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const hsl: HSL = { h: _hsl.h.value, s: _hsl.s.value, l: _hsl.l.value };
    const rgb: RGB = hslToRgb(hsl);
    const hex: HEX = rgbToHex(rgb);
    const cmyk: CMYK = rgbToCmyk(rgb);
    const hsv: HSV = hslToHsv(hsl);

    const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const hexString = `#${hex.r}${hex.g}${hex.b}`;
    const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    const hsvString = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;

    setColors([hslString, rgbString, hexString, cmykString, hsvString]);
  }, [_hsl]);

  const handleCopyToClipboard = (text: string) => {
    Clipboard.setString(text);

    modal.handleOpen({
      content: (
        <InfoModal
          buttonText="Perfect!"
          title={`"${text}" successfully copied to clipboard`}
        />
      ),
    });
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        horizontal
        keyExtractor={(color, index) => `color-${index}-${color}`}
        data={colors}
        renderItem={({ item }) => (
          <Button
            onPress={handleCopyToClipboard.bind(null, item)}
            title={item}
            variant="outlined"
          />
        )}
      />
    </TouchableOpacity>
  );
};
