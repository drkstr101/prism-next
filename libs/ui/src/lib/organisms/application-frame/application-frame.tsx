import { DimensionValue, Flex, Grid, View } from '@adobe/react-spectrum';
import { Responsive } from '@prism-next/theme';

import { ReactNode } from 'react';

export interface ApplicationFrameProps {
  /** The main contents of the page. */
  children: ReactNode;
}

/**
 * Specify some responsive grid areas (Slots) for the application layout
 */
const gridAreas: Responsive<string[]> = {
  base: ['header', 'nav', 'content', 'footer'],
  M: ['header header', 'nav content', 'nav content', 'footer footer'],
  L: [
    'header header  header',
    'nav    content panel',
    'nav    content panel',
    'footer footer  footer',
  ],
};

const gridColumns: Responsive<string | DimensionValue[]> = {
  M: ['size-2000', '1fr'],
  L: ['size-2000', '1fr', 'size-2000'],
};

export function ApplicationFrame({ children, ...props }: ApplicationFrameProps) {
  return (
    <Grid areas={gridAreas} columns={gridColumns} gap="size-50">
      <View backgroundColor="celery-600" gridArea="header" height="size-1000" />
      <View backgroundColor="blue-600" gridArea="nav">
        <Flex direction={{ base: 'row', M: 'column' }} gap="size-100" margin="size-100">
          <View backgroundColor="static-gray-50" height="size-250" minWidth="size-900" />
          <View backgroundColor="static-gray-50" height="size-250" minWidth="size-900" />
          <View backgroundColor="static-gray-50" height="size-250" minWidth="size-900" />
        </Flex>
      </View>
      <View backgroundColor="purple-600" gridArea="content" height="size-4600">
        {children}
      </View>
      <View
        backgroundColor="magenta-600"
        gridArea="panel"
        minHeight="size-1000"
        isHidden={{ base: true, L: false }}
      />
      <View backgroundColor="seafoam-600" gridArea="footer" height="size-1000" />
    </Grid>
  );
}

export default ApplicationFrame;
