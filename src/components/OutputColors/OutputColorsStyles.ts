import { makeStyles } from 'providers/Theme';
import { StyleSheet } from 'react-native';

export const useStyles = makeStyles((theme) =>
  StyleSheet.create({
    container: {
      marginTop: theme.spacing(),
    },
    flatList: {
      paddingHorizontal: theme.spacing(3),
    },
  }),
);
