import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const GRAPHQL_URL = import.meta.env.VITE_GITHUB_GRAPHQL_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_GRAPHQL_TOKEN;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
})

const authLink = setContext((_, { headers }) => {
  const token = GITHUB_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
