import { images } from 'assets';
import { ColorHarmony } from 'components/ColorHarmony';
import { HSLInput } from 'components/HSLInput';
import { useTheme } from 'providers/Theme';
import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { withLayout } from '../../hoc';
import { useStyles } from './HomeScreenStyles';

export const HomeScreen: FC = withLayout(() => {
  const styles = useStyles();
  const { generateTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={generateTheme}
      style={styles.container}
    >
      <HSLInput />
      <Image source={images.logo} style={styles.logo} />
      <ColorHarmony />
    </TouchableOpacity>
  );
});
