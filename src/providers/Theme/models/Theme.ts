import { TextStyle } from 'react-native';

export interface Theme {
  name: string;
  spacing: (n?: number) => number;
  radius: (n?: number) => number;
  text: {
    title: TextStyle & {
      fontSize: number;
    };
    title2: TextStyle & {
      fontSize: number;
    };
    subtitle: TextStyle & {
      fontSize: number;
    };
    subtitle2: TextStyle & {
      fontSize: number;
    };
    body: TextStyle & {
      fontSize: number;
    };
    body2: TextStyle & {
      fontSize: number;
    };
    button: TextStyle & {
      fontSize: number;
      textTransform: string;
      fontWeight: string;
    };
  };
  palette: {
    primary: string;
    danger: string;
    grey: string;
    success: string;
    background: string;
    text: string;
  };
  shadows: Shadow[];
}

type Shadow = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};
