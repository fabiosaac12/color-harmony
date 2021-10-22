import { Dimensions, StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

const window = Dimensions.get('window');

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: theme.spacing(2),
      flex: 1,
      justifyContent: 'space-between',
    },
    logo: {
      width: window.width / 3,
      height: window.width / 3,
      marginLeft: 'auto',
      marginRight: 'auto',
      tintColor: theme.palette.text,
      opacity: 0.1,
    },
  }),
);
