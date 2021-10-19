import { makeStyles } from 'providers/Theme';
import { Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('window');

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: theme.spacing(2),
    },
    color: {
      width: window.width * 0.25,
      height: 80,
      borderRadius: theme.radius(2),
      borderColor: theme.palette.text,
      borderWidth: 2,
      marginHorizontal: theme.spacing(1),
    },
    flatList: {
      marginVertical: theme.spacing(),
      paddingHorizontal: theme.spacing(3),
    },
  }),
);
