import {
  Button,
  ButtonGroup,
  Checkbox,
  Content,
  Divider,
  Flex,
  Footer,
  Form,
  Header,
  Heading,
  Link,
  Provider,
  Text,
  TextField,
  defaultTheme,
} from '@adobe/react-spectrum';
import Book from '@spectrum-icons/workflow/Book';
import { render } from '@testing-library/react';

import ApplicationFrame from './application-frame';

const ExampleContent = () => (
  <>
    <Heading>
      <Flex alignItems="center" gap="size-100">
        <Book size="S" />
        <Text>Register for newsletter</Text>
      </Flex>
    </Heading>
    <Header>
      <Link>
        <a href="//example.com" target="_blank" rel="noreferrer">
          What is this?
        </a>
      </Link>
    </Header>
    <Divider />
    <Content>
      <Form>
        <TextField label="First Name" autoFocus />
        <TextField label="Last Name" />
        <TextField label="Street Address" />
        <TextField label="City" />
      </Form>
    </Content>
    <Footer>
      <Checkbox>I want to receive updates for exclusive offers in my area.</Checkbox>
    </Footer>
    <ButtonGroup>
      <Button variant="secondary">Cancel</Button>
      <Button variant="accent">Register</Button>
    </ButtonGroup>
  </>
);

describe('ApplicationFrame', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Provider theme={defaultTheme}>
        <ApplicationFrame>
          <ExampleContent />
        </ApplicationFrame>
      </Provider>
    );
    expect(container).toBeInstanceOf(HTMLElement);
    expect(container).toMatchSnapshot();
  });
});
