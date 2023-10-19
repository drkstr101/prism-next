export type { Breakpoints, ColorScheme, Theme } from '@react-types/provider';

type ResponsiveProp<T> = {
  base?: T;
  S?: T;
  M?: T;
  L?: T;
  [custom: string]: T | undefined;
};

export type Responsive<T> = T | ResponsiveProp<T>;
