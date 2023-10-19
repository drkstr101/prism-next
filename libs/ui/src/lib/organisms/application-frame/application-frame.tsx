'use client';

import { ActionButton, Flex, Grid, Provider, View, lightTheme } from '@adobe/react-spectrum';
import { ColorScheme } from '@prism-next/theme';
import { ToastContainer } from '@react-spectrum/toast';
import { enableTableNestedRows } from '@react-stately/flags';
import Light from '@spectrum-icons/workflow/Light';
import Moon from '@spectrum-icons/workflow/Moon';
import { ReactNode, useState } from 'react';

export interface ClientRouter {
  navigate: (path: string) => void;
}

export interface ApplicationFrameProps {
  children: ReactNode;
  router: ClientRouter;
}

export function ApplicationFrame({ children, router }: ApplicationFrameProps) {
  // TODO make initial selection from system prefs
  const [theme, setTheme] = useState<ColorScheme>('light');
  const themeIcons = { dark: <Moon />, light: <Light /> };
  const otherTheme: ColorScheme = theme === 'light' ? 'dark' : 'light';

  enableTableNestedRows();

  return (
    <Provider theme={lightTheme} colorScheme={theme} router={router}>
      <Grid
        areas={['header', 'content']}
        columns={['1fr']}
        rows={['size-200', 'auto']}
        gap="size-100"
      >
        <Flex direction="row" gap="size-100" justifyContent="end" margin="size-100">
          <ActionButton
            aria-label={`Switch to ${otherTheme} mode.`}
            onPress={() => setTheme(otherTheme)}
          >
            {themeIcons[otherTheme]}
          </ActionButton>
        </Flex>
        <View backgroundColor="gray-50">{children}</View>
      </Grid>
      <ToastContainer />
    </Provider>
  );
}

export default ApplicationFrame;
