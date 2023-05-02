import { ApolloClient, InMemoryCache } from '@apollo/client';

const { VITE_GITHUB_ACCESS_TOKEN } = import.meta.env;

export const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: `Bearer ${VITE_GITHUB_ACCESS_TOKEN}`
    },
    cache: new InMemoryCache()
});