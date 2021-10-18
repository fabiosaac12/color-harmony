import { StyleSheet } from 'react-native';
import { makeStyles } from '../../providers/Theme';

interface Props {
  variant:
    | 'title'
    | 'title2'
    | 'subtitle'
    | 'subtitle2'
    | 'body'
    | 'body2'
    | 'button';
  color: 'text' | 'primary' | 'secondary' | 'danger' | 'success' | 'button';
}

export const useStyles = makeStyles((theme, { color, variant }: Props) =>
  StyleSheet.create({
    text: {
      color: theme.palette.text,
      ...theme.text[variant],
    },
  }),
);
