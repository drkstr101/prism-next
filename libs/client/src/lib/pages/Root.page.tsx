import { gql, useQuery } from '@apollo/client';

import Root from '../ui/Root';

const ROOT_DATA = gql`
  query RootData {
    getRootData
  }
`;

const RootPage = () => {
  const { data, loading, error } = useQuery(ROOT_DATA);

  if (error) {
    throw error;
  }

  return <Root data={data && data.getRootData} loading={loading} />;
};

export default RootPage;