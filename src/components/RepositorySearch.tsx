import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Repository, SearchData, SearchVars } from '../types/interfaces';
import { GET_REPOSITORIES } from '../graphql/queries';

function RepositorySearch(): JSX.Element {
  const [repoQuery, setRepoQuery] = useState<string>('');

  const { loading: repoLoading, error: repoError, data: repoData } = useQuery<SearchData, SearchVars>(GET_REPOSITORIES, {
    variables: { query: repoQuery }
  });

  if (repoError) return <p>Error :(</p>;

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
          <ul>
            {repoLoading ? <p>Loading...</p> 
                : repoData?.search.nodes.map((repo: Repository) => (
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

export default RepositorySearch;