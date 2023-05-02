import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { User, SearchData, SearchVars } from '../types/interfaces';
import { GET_USERS } from '../graphql/queries';

function UserSearch() {
  const [userQuery, setUserQuery] = useState<string>('');
  
  const { loading: userLoading, error: userError, data: userData } = useQuery<SearchData, SearchVars>(GET_USERS, {
    variables: { query: userQuery }
  });

   if (userError) return <p>Error :(</p>;

  return (
    <div className="container">
      <h1>Users Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={userQuery}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUserQuery(event.target.value)
          }
          placeholder="Search for users"
          className="search-input"
        />
      </div>
      <div className="results-container">
        <div className="results-section">
          <ul>
            {userLoading ? <p>Loading...</p> 
                : userData?.search.nodes.map((user: User) => (
              <li key={user.login}>
                <img src={user.avatarUrl} alt={user.login} />
                <a href={user.url}>{user.name || user.login}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserSearch;