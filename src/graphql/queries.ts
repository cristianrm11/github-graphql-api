import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          nameWithOwner
          description
          url
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($query: String!) {
    search(query: $query, type: USER, first: 10) {
      nodes {
        ... on User {
          name
          login
          avatarUrl(size: 100)
          url
        }
      }
    }
  }
`;