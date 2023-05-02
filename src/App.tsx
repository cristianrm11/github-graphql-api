import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

interface Repository {
  nameWithOwner: string;
  description: string;
  url: string;
}

interface User {
  name: string;
  login: string;
  avatarUrl: string;
  url: string;
}

interface SearchData {
  search: {
    nodes: (Repository | User)[];
  };
}

interface SearchVars {
  query: string;
}

const GET_REPOSITORIES = gql`
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

const GET_USERS = gql`
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

function App() {
  const [query, setQuery] = useState<string>('');
  const { loading: repoLoading, error: repoError, data: repoData } = useQuery<SearchData, SearchVars>(GET_REPOSITORIES, {
    variables: { query }
  });
  const { loading: userLoading, error: userError, data: userData } = useQuery<SearchData, SearchVars>(GET_USERS, {
    variables: { query }
  });

  if (repoLoading || userLoading) return <p>Loading...</p>;
  if (repoError || userError) return <p>Error :(</p>;

  return (
    <div>
      <h2>Repositories</h2>
      <input
        type="text"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />
      <ul>
        {repoData?.search.nodes.map((repo: Repository) => (
          <li key={repo.url}>
            <a href={repo.url}>{repo.nameWithOwner}</a>: {repo.description}
          </li>
        ))}
      </ul>
      <h2>Users</h2>
      <ul>
        {userData?.search.nodes.map((user: User) => (
          <li key={user.login}>
            <img src={user.avatarUrl} alt={user.login} />
            <a href={user.url}>{user.name || user.login}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;