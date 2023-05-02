import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

interface Repository {
  nameWithOwner: string;
  description: string;
  url: string;
}

interface SearchData {
  search: {
    nodes: Repository[];
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

function App() {
  const [query, setQuery] = useState<string>('');
  const { loading, error, data } = useQuery<SearchData, SearchVars>(GET_REPOSITORIES, {
    variables: { query }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <label>Type the name of the repository</label>
      <input
        type="text"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />
      <ul>
        {data?.search.nodes.map((repo: Repository) => (
          <li key={repo.url}>
            <a href={repo.url}>{repo.nameWithOwner}</a>: {repo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;