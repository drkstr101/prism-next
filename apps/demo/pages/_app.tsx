import { ActionButton, Flex, Grid, Provider, View, defaultTheme } from '@adobe/react-spectrum';
import { ToastContainer } from '@react-spectrum/toast';
import { enableTableNestedRows } from '@react-stately/flags';
import { ColorScheme } from '@react-types/provider';
import Light from '@spectrum-icons/workflow/Light';
import Moon from '@spectrum-icons/workflow/Moon';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState } from 'react';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ColorScheme>('light');

  const router = useRouter();
  const themeIcons = { dark: <Moon />, light: <Light /> };
  const otherTheme: ColorScheme = theme === 'light' ? 'dark' : 'light';
  enableTableNestedRows();

  return (
    <Provider theme={defaultTheme} colorScheme={theme} router={{ navigate: router.push }}>
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
        <View>
          <Component {...pageProps} />
        </View>
      </Grid>
      <ToastContainer />
    </Provider>
  );
}

export default CustomApp;
