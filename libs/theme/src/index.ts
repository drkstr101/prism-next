import dark from './lib/spectrum-dark.module.css';
import darkest from './lib/spectrum-darkest.module.css';
import global from './lib/spectrum-global.module.css';
import large from './lib/spectrum-large.module.css';
import light from './lib/spectrum-light.module.css';
import lightest from './lib/spectrum-lightest.module.css';
import medium from './lib/spectrum-medium.module.css';
import { Theme } from './lib/theme';
import './styles/index.css';

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

export type { Breakpoints, ColorScheme, Theme } from './lib/theme';
