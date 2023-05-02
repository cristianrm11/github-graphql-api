
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: `Bearer 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`
    },
    cache: new InMemoryCache()
});