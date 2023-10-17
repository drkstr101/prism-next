import { Provider, View, defaultTheme } from '@adobe/react-spectrum';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import { ReactNode } from 'react';
import Index from '../pages/index';

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <Provider theme={defaultTheme} colorScheme="light" router={{ navigate: router.push }}>
      <View>{children}</View>
    </Provider>
  );
};

describe('/demo', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Layout>
        <Index />
      </Layout>
    );
    expect(container).toBeInstanceOf(HTMLElement);
    expect(container).toMatchSnapshot();
  });
});
