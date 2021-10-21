import { makeStyles } from 'providers/Theme';
import { Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('window');

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme.spacing(),
    },
    button: {
      padding: theme.spacing(2),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.radius(),
      position: 'relative',
    },
    buttonIcon: {
      color: theme.palette.text,
    },
    sliderContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(),
    },
    slider: {
      width: window.width * 0.8,
    },
    sliderIcon: {
      color: theme.palette.text,
    },
    padLock: {
      color: theme.palette.text,
      position: 'absolute',
      top: 0,
      right: 0,
    },
    input: {
      color: theme.palette.text,
      ...theme.text.button,
      textAlign: 'center',
      paddingVertical: 0,
    },
  }),
);
