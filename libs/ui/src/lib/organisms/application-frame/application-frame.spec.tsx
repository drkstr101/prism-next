import { Content, Divider, Heading } from '@adobe/react-spectrum';
import { act, render, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';

import ApplicationFrame from './application-frame';

describe('ApplicationFrame', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useRouter());
    act(() => {
      const { container } = render(
        <ApplicationFrame router={{ navigate: result.current.push }}>
          <Heading>Status</Heading>
          <Divider />
          <Content>Printer Status: Connected</Content>
        </ApplicationFrame>
      );
      expect(container).toBeInstanceOf(HTMLElement);
    });
  });
});
