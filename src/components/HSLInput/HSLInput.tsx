import { Text } from 'components/Text';
import { themes, useTheme } from 'providers/Theme';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { useStyles } from './HSLInputStyle';
import { Values } from './models/Values';
import { HSLLetters } from './models/HSLLetters';
import { HSLValue } from 'providers/Theme/models/HSLValue';
import { useDidUpdateEffect } from 'hooks/useDidUpdateEffect';

const sliders: { item: HSLLetters; icon: string }[] = [
  {
    item: 'h',
    icon: 'color-filter-outline',
  },
  {
    item: 's',
    icon: 'contrast',
  },
  {
    item: 'l',
    icon: 'sunny',
  },
];

export const HSLInput = () => {
  const styles = useStyles();
  const { theme } = useTheme();

  const { hsl, handleSetHsl, addGenerateThemeCallback } = useTheme();
  const [innerHsl, setInnerHsl] = useState<HSLValue>(hsl);

  useEffect(() => {
    addGenerateThemeCallback((hsl) => setInnerHsl(hsl));
  }, []);

  const values: Values = [
    { ...hsl.h, icon: 'color-filter-outline', name: 'h' },
    { ...hsl.s, icon: 'contrast', name: 's' },
    { ...hsl.l, icon: 'sunny', name: 'l' },
  ];

  return (
    <View>
      <View style={styles.buttonsContainer}>
        {values.map((value) => (
          <TouchableOpacity
            key={`${value.name}-button`}
            activeOpacity={0.9}
            onPress={() =>
              handleSetHsl({
                [value.name]: { value: value.value, locked: !value.locked },
              })
            }
            style={styles.button}
          >
            <Icon name={value.icon} size={40} style={styles.buttonIcon} />
            <Text variant="button">{value.value}</Text>
            <Icon
              name={value.locked ? 'lock-closed' : 'lock-open-outline'}
              style={styles.padLock}
              size={20}
            />
          </TouchableOpacity>
        ))}
      </View>

      {sliders.map(({ icon, item }) => (
        <View key={`${item}-slider`} style={styles.sliderContainer}>
          <Icon name={icon} size={25} style={styles.sliderIcon} />
          <Slider
            disabled={hsl[item].locked}
            style={styles.slider}
            onValueChange={(value) =>
              handleSetHsl({
                [item]: { value: Math.round(value), locked: false },
              })
            }
            thumbTintColor={theme.palette.text}
            minimumTrackTintColor={theme.palette.text}
            maximumTrackTintColor={theme.palette.text}
            value={innerHsl[item].value}
            minimumValue={0}
            maximumValue={item === 'h' ? 360 : 100}
          />
        </View>
      ))}
    </View>
  );
};
