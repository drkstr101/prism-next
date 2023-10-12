import 'fontsource-advent-pro';

export interface PubSweetTheme {
  colorBackground: string;
  colorBorder: string;
  colorPrimary: string;

  fontInterface: string;
  fontSize: string;
  fontSizeBase: string;
  lineHeight: string;

  gridUnit: string;
}

export const defaultTheme: PubSweetTheme = {
  colorBackground: '#fefae0',
  colorBorder: 'lightslategray',
  colorPrimary: '#606c38',

  fontInterface: 'Advent Pro',
  fontSize: '16',
  fontSizeBase: '16px',
  lineHeight: '1.618',

  gridUnit: '8px',
};
