import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    container: {
      backgroundColor: theme.palette.background,
      borderRadius: 32,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: '100%',
      maxHeight: '90%',
      ...theme.shadows[4],
    },
  }),
);
