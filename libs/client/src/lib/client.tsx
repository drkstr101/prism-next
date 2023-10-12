import {
  ApolloClient,
  ApolloClientOptions,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { CurrentUserContext, serverUrl } from '@coko/client';
import { ConfigProvider as AntConfigProvider } from 'antd';
import { createUploadLink } from 'apollo-upload-client';
import pickBy from 'lodash/pickBy';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { defaultRoutes } from './routes';
import { PubSweetTheme } from './styled';
import { defaultTheme } from './theme';

export type ApolloConfigFunc = (
  options: ApolloClientOptions<unknown>
) => ApolloClientOptions<unknown>;

export interface PubSweetClientProps {
  makeApolloConfig?: ApolloConfigFunc;
  routes?: JSX.Element;
  theme?: PubSweetTheme;
}

const wsMinTimeout = parseInt(process.env['CLIENT_WS_MIN_TIMEOUT'], 10) || 0;
const wsTimeout = parseInt(process.env['CLIENT_WS_TIMEOUT'], 10) || 0;

let wsLink;
let webSocketClient;

const pxToNumConverter = (value: string): string | number => {
  if (typeof value === 'string') {
    if (value.slice(-2) === 'px') return parseInt(value.slice(0, -2), 10);
  }

  return value;
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colorBackground};
    color: ${(props) => props.theme.colorText};
    font-family: ${(props) => props.theme.fontInterface}, sans-serif;
    font-size: ${(props) => props.theme.fontSizeBase};
    line-height: ${(props) => props.theme.lineHeightBase};

    * {
      box-sizing: border-box;
    }
  }
`;

// See https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-465305186
export function stripTypeNames(obj: Record<string, any>) {
  Object.keys(obj).forEach((property) => {
    if (
      obj[property] !== null &&
      typeof obj[property] === 'object' &&
      !(obj[property] instanceof File)
    ) {
      delete obj.property;
      const newData = stripTypeNames(obj[property]);
      obj[property] = newData;
    } else if (property === '__typename') {
      delete obj[property];
    }
  });

  return obj;
}

/**
 * Construct an ApolloClient. If a function is passed as the first argument, it will be called
 * with the default client config as an argument, and should return the desired config.
 *
 * @param makeConfig
 * @returns
 */
const makeApolloClient = (makeConfig: ApolloConfigFunc) => {
  const serverURL = new URL(serverUrl);
  const serverProtocol = serverURL.protocol;
  const wsProtocol = serverProtocol === 'https:' ? 'wss' : 'ws';
  const serverHostname = serverURL.hostname;
  const serverPort = serverURL.port;

  const uploadLink = createUploadLink({
    uri: `${serverUrl}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const removeTypename = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = stripTypeNames(operation.variables);
    }

    return forward(operation);
  });

  let link = ApolloLink.from([removeTypename, authLink, uploadLink]);

  if (localStorage.getItem('token')) {
    if (!webSocketClient) {
      webSocketClient = new SubscriptionClient(
        `${wsProtocol}://${serverHostname}${serverPort ? `:${serverPort}` : ''}/subscriptions`,
        {
          reconnect: true,
          lazy: true,
          inactivityTimeout: 3000,
          minTimeout: wsMinTimeout,
          timeout: wsTimeout,
          connectionParams: {
            authToken: localStorage.getItem('token'),
          },
        }
      );
    }

    if (!wsLink) {
      wsLink = new WebSocketLink(webSocketClient);
    }
  }

  if (wsLink) {
    link = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return def.kind === 'OperationDefinition' && def.operation === 'subscription';
      },
      wsLink,
      link
    );
  }

  const config = {
    link,
    cache: new InMemoryCache(),
  };

  return new ApolloClient(makeConfig ? makeConfig(config) : config);
};

export function PubSweetClient({
  makeApolloConfig,
  routes = defaultRoutes,
  theme = defaultTheme,
}: PubSweetClientProps) {
  const [currentUser, setCurrentUser] = useState();
  const client = useRef(makeApolloClient(makeApolloConfig));
  const token = localStorage.getItem('token');

  const mapper = {
    borderRadius: pxToNumConverter(theme.borderRadius),
    colorBgBase: theme.colorBackground,
    colorTextBase: theme.colorText,
    fontFamily: theme.fontInterface,
    fontSize: pxToNumConverter(theme.fontSizeBase),
    fontSizeHeading1: pxToNumConverter(theme.fontSizeHeading1),
    fontSizeHeading2: pxToNumConverter(theme.fontSizeHeading2),
    fontSizeHeading3: pxToNumConverter(theme.fontSizeHeading3),
    fontSizeHeading4: pxToNumConverter(theme.fontSizeHeading4),
    fontSizeHeading5: pxToNumConverter(theme.fontSizeHeading5),
    fontSizeHeading6: pxToNumConverter(theme.fontSizeHeading6),
    lineType: theme.borderStyle,
    lineWidth: pxToNumConverter(theme.borderWidth),
    motionUnit: theme.transitionDuration,
    sizeUnit: pxToNumConverter(theme.gridUnit),
  };

  const mappedAntTheme = {
    token: {
      ...theme,
      ...pickBy(mapper, (v) => !!v),
    },
  };

  useEffect(() => {
    if (token) {
      client.current = makeApolloClient(makeApolloConfig);
    }

    if (!token && webSocketClient) {
      webSocketClient.unsubscribeAll();
      webSocketClient.close();
      webSocketClient = null;
    }
  }, [makeApolloConfig, token]);

  return (
    <ApolloProvider client={client.current}>
      <BrowserRouter>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <AntConfigProvider theme={mappedAntTheme}>
            <ThemeProvider theme={theme}>
              <Normalize />
              <GlobalStyle />
              {routes}
            </ThemeProvider>
          </AntConfigProvider>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default PubSweetClient;
