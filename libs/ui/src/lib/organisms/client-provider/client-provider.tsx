'use client';

import { ActionButton, Flex, Grid, Provider, ProviderProps, View } from '@adobe/react-spectrum';
import { ColorScheme, neutralTheme } from '@prism-next/theme';
import { ToastContainer } from '@react-spectrum/toast';
import { enableTableNestedRows } from '@react-stately/flags';
import Light from '@spectrum-icons/workflow/Light';
import Moon from '@spectrum-icons/workflow/Moon';
import { useState } from 'react';

export function ClientProvider({ children, ...props }: ProviderProps) {
  const [theme, setTheme] = useState<ColorScheme>('light');
  const themeIcons = { dark: <Moon />, light: <Light /> };
  const otherTheme: ColorScheme = theme === 'light' ? 'dark' : 'light';

  enableTableNestedRows();

  return (
    <Provider theme={neutralTheme} colorScheme={theme} {...props}>
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
        <View>{children}</View>
      </Grid>
      <ToastContainer />
    </Provider>
  );
}

export default ClientProvider;
