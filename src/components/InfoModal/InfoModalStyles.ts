import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

interface Props {
  variant: 'primary' | 'danger' | 'success';
}

export const useStyles = makeStyles((theme, { variant }: Props) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing(3),
    },
    title: {
      textAlign: 'center',
      color:
        theme.name === 'light'
          ? theme.palette[variant]
          : theme.palette[variant],
      marginBottom: 15,
    },
  }),
);
