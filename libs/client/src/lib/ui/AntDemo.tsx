import { Button, Container } from '@prism-next/ui';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Explainer = styled.div`
  margin: 20px;
`;

const Element = styled.div`
  margin: 10px;
`;

const AntDemo = () => (
  <Container second>
    <div>
      <Link to="/">Go back</Link>
    </div>

    <Explainer>Changes to the primary color in the theme should be reflected here.</Explainer>

    <Element>
      <Button type="primary">Primary button</Button>
    </Element>

    <Element>
      <Select
        options={[
          { value: '1', label: 'test1' },
          { value: '2', label: 'test2' },
          { value: '3', label: 'test3' },
        ]}
        placeholder="Select an option"
      />
    </Element>
  </Container>
);

export default AntDemo;
