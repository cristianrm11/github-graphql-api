import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Repository, User, SearchData, SearchVars } from '../types/interfaces';
import { GET_REPOSITORIES, GET_USERS } from '../graphql/queries';

function App() {
  const [repoQuery, setRepoQuery] = useState<string>('');

  const { loading: repoLoading, error: repoError, data: repoData } = useQuery<SearchData, SearchVars>(GET_REPOSITORIES, {
    variables: { query: repoQuery }
  });
//   if (repoLoading || userLoading) return <p>Loading...</p>;
//   if (repoError || userError) return <p>Error :(</p>;

  return (
    <div className="container">
      <h1>Repository Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={repoQuery}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRepoQuery(event.target.value)
          }
          placeholder="Search for repositories"
          className="search-input"
        />
      </div>
      <div className="results-container">
        <div className="results-section">
          <h2>Repositories</h2>
          <ul>
            {repoData?.search.nodes.map((repo: Repository) => (
              <li key={repo.url}>
                <a href={repo.url}>{repo.nameWithOwner}</a>: {repo.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;