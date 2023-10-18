import { render } from '@testing-library/react';

import ClientProvider from './client-provider';

describe('BaseLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientProvider />);
    expect(baseElement).toBeTruthy();
  });
});
