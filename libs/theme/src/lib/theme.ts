import dark from './spectrum-dark.module.css';
import darkest from './spectrum-darkest.module.css';
import global from './spectrum-global.module.css';
import large from './spectrum-large.module.css';
import light from './spectrum-light.module.css';
import lightest from './spectrum-lightest.module.css';
import medium from './spectrum-medium.module.css';
import { Theme } from './theme.types';

export const lightTheme: Theme = {
  global,
  light: lightest,
  dark: darkest,
  medium,
  large,
};

export const neutralTheme: Theme = {
  global,
  light,
  dark,
  medium,
  large,
};

export const darkTheme: Theme = {
  global,
  light: dark,
  dark: darkest,
  medium,
  large,
};
