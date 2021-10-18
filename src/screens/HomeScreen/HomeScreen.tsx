import { useTheme } from 'providers/Theme';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../../components/Text';
import { withLayout } from '../../hoc';
import { useMessages } from './HomeScreenMessages';
import { useStyles } from './HomeScreenStyles';

export const HomeScreen: FC = withLayout(() => {
  const messages = useMessages();
  const styles = useStyles();
  const { generateTheme } = useTheme();

  return (
    <TouchableOpacity onPress={generateTheme} style={styles.container}>
      <Text variant="title" color="secondary">
        {messages.greeting}
      </Text>
    </TouchableOpacity>
  );
});
