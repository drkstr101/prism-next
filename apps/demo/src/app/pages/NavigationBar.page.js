import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useCurrentUser } from '@coko/client';
import React from 'react';

import NavigationBar from '../ui/NavigationBar';

const LOGIN = gql`
  mutation Login {
    login(input: { username: "admin", password: "password" }) {
      token
      # user {
      #   id
      #   username
      # }
    }
  }
`;

const NavigationBarPage = () => {
  const client = useApolloClient();
  const [login, { data, loading }] = useMutation(LOGIN);
  const { currentUser, setCurrentUser } = useCurrentUser();
  // console.log(currentUser)

  React.useEffect(() => {
    if (data) {
      const token = data.login?.token;
      if (token) localStorage.setItem('token', token);
      setCurrentUser(data.login.user);
    }
  }, [data]);

  const logout = () => {
    setCurrentUser(null);
    client.cache.reset();

    localStorage.removeItem('token');
  };

  return (
    <NavigationBar
      currentUsername={currentUser && currentUser.username}
      login={login}
      loginLoading={loading}
      logout={logout}
    />
  );
};

export default NavigationBarPage;
