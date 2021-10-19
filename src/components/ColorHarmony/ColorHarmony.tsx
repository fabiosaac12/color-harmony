import { Button } from 'components/Button';
import { useTheme } from 'providers/Theme';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useMessages } from './ColorHarmonyMessages';
import { useStyles } from './ColorHarmonyStyles';
import {
  getAnalogous,
  getComplementary,
  getPositiveHue,
  getSplitComplementary,
  getTriadic,
} from './helpers';
import { AvailableHarmonies } from './models/AvailableHarmonies';
import { Harmonies } from './models/Harmonies';

const availableHarmonies: AvailableHarmonies[] = [
  'analogous',
  'complementary',
  'triadic',
  'splitComplementary',
];

export const ColorHarmony: FC = () => {
  const messages = useMessages();
  const styles = useStyles();
  const { hsl: _hsl, handleSetHsl } = useTheme();
  const [harmonies, setHarmonies] = useState<Harmonies>();
  const [activeHarmony, setActiveHarmony] =
    useState<AvailableHarmonies>('analogous');

  const hsl = { h: _hsl.h.value, s: _hsl.s.value, l: _hsl.l.value };

  useEffect(() => {
    const complementary = getComplementary(hsl);
    const analogous = getAnalogous(hsl);
    const triadic = getTriadic(hsl);
    const splitComplementary = getSplitComplementary(hsl);

    setHarmonies({ complementary, analogous, triadic, splitComplementary });
  }, [_hsl]);

  return harmonies ? (
    <View>
      <FlatList
        contentContainerStyle={styles.flatList}
        keyExtractor={(item) => `${item}Tab`}
        showsHorizontalScrollIndicator={false}
        data={availableHarmonies}
        horizontal
        renderItem={({ item }) => (
          <Button
            onPress={() => setActiveHarmony(item)}
            title={messages[item]}
            color="text"
            variant={activeHarmony === item ? 'filled' : 'outlined'}
          />
        )}
      />
      <FlatList
        contentContainerStyle={styles.flatList}
        horizontal
        keyExtractor={({ h, s, l }, index) =>
          `${h}-${s}-${l}-${index}-harmony-color`
        }
        data={[hsl, ...harmonies[activeHarmony]]}
        renderItem={({ item: { h, s, l } }) => (
          <TouchableOpacity
            onPress={() =>
              handleSetHsl({
                h: { value: getPositiveHue(h), locked: _hsl.h.locked },
                s: { value: s, locked: _hsl.s.locked },
                l: { value: l, locked: _hsl.l.locked },
              })
            }
            style={[
              styles.color,
              { backgroundColor: `hsl(${h}, ${s}%, ${l}%)` },
            ]}
          />
        )}
      />
    </View>
  ) : null;
};
