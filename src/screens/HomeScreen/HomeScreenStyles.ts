import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: theme.spacing(2),
      flex: 1,
      justifyContent: 'space-between',
    },
  }),
);
