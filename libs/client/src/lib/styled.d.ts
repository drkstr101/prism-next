import { ThemeConfig } from 'antd';
import { DefaultTheme } from 'styled-components';

// module augmentation for default theme type
declare module 'styled-components' {
  export interface DefaultTheme {
    /* Colors */
    colorBackground: string;
    colorPrimary: string;
    colorSecondary: string;
    colorDisabled: string;
    colorBorder: string;
    colorSuccess: string;
    colorError: string;
    colorWarning: string;
    colorText: string;
    colorTextReverse: string;
    colorTextPlaceholder: string;

    /* Text variables */

    // fonts
    fontInterface: string;
    fontHeading: string;
    fontReading: string;
    fontWriting: string;

    // font sizes
    fontSizeBase: string;
    fontSizeBaseSmall: string;
    fontSizeHeading1: string;
    fontSizeHeading2: string;
    fontSizeHeading3: string;
    fontSizeHeading4: string;
    fontSizeHeading5: string;
    fontSizeHeading6: string;

    // line heights
    lineHeightBase: string;
    lineHeightBaseSmall: string;
    lineHeightHeading1: string;
    lineHeightHeading2: string;
    lineHeightHeading3: string;
    lineHeightHeading4: string;
    lineHeightHeading5: string;
    lineHeightHeading6: string;

    /* Spacing */
    gridUnit: string;

    /* Border */
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;

    // Does not exist
    // $borderColor: string;

    /* Shadow (for tooltip) */
    boxShadow: string;

    /* Transition */
    transitionDuration: string;
    transitionTimingFunction: string;
    transitionDelay: string;
  }
}

export type PubSweetTheme = ThemeConfig<DefaultTheme>;
