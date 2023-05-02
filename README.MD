# Github GraphQL API

Small vite app to show how to query the GraphQL API of github to get users and repositories data.
The repo contains two main components for each feature (users, repositories), pretty much have the same logic using different queries: GET_USERS, GET_REPOSITORIES.
They could maybe be managed using a Single component passing some props as a filter such as QueryType ass a parameter to run the query depending and show the list of users or the list of repos but for testing the behavior expected I just left a single component for each scenario.

## How to run

Please create a personal access token and replace it at the `.env` file inside of the project.
Here you can find the url to create the access token: https://github.com/settings/tokens

Then just open the app, in the root of the repository run

```
npm run dev
```
