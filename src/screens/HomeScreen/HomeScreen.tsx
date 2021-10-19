import { ColorHarmony } from 'components/ColorHarmony';
import { HSLInput } from 'components/HSLInput';
import { useTheme } from 'providers/Theme';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { withLayout } from '../../hoc';
import { useMessages } from './HomeScreenMessages';
import { useStyles } from './HomeScreenStyles';

export const HomeScreen: FC = withLayout(() => {
  const messages = useMessages();
  const styles = useStyles();
  const { generateTheme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={generateTheme}
      style={styles.container}
    >
      <HSLInput />
      <ColorHarmony />
    </TouchableOpacity>
  );
});
