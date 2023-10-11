import { Container, ItemList } from '@prism-next/ui';
import { Link } from 'react-router-dom';

const Root = (props) => {
  const { data, loading } = props;

  return (
    <Container>
      <div>
        <Link to="/imagedemo">Image demo</Link>
        <Link to="/ant">Ant</Link>
        <Link to="/protected">Protected</Link>
      </div>

      <ItemList data={data} loading={loading} />
    </Container>
  );
};

export default Root;
