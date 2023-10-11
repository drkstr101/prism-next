import { Container } from '@prism-next/ui';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImageContainer = styled.div`
  height: 300px;

  img {
    height: 100%;
  }
`;

const ImageDemo = () => (
  <Container second>
    <div>
      <Link to="/">Go back</Link>
    </div>

    <ImageContainer>
      <img alt="a bird" src="sample-image.jpg" />
    </ImageContainer>
  </Container>
);

export default ImageDemo;
