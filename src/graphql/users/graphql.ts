import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
  query searchUsers(
    $query: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    search(
      type: USER
      query: $query
      first: $first
      after: $after
      before: $before
    ) {
      edges {
        node {
          ... on User {
            login
            avatarUrl
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPreviousPage
      }
      userCount
    }
  }
`;

export const SEARCH_USER_BY_LOGIN = gql`
  query searchUserByLogin($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      name
      bio
      location
    }
  }
`;

export const GET_USER_REPOS = gql`
  query getUserRepos(
    $login: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    user(login: $login) {
      repositories(first: $first, after: $after, before: $before, privacy: PUBLIC) {
        nodes {
          id
          name
          description
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
    }
  }
`;

export const GET_REPO_ISSUES = gql`
  query getRepoIssues(
    $owner: String!
    $name: String!
    $first: Int!
    $after: String
    $before: String
  ) {
    repository(owner: $owner, name: $name) {
      issues(first: $first, after: $after, before: $before, states: OPEN, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          title
          body
          createdAt
          author {
            login
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
        }
        totalCount
      }
    }
  }
`;

export const GET_REPO_INFO = gql`
  query getRepoInfo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      stargazerCount
      forkCount
      url
    }
  }
`;

export const CREATE_ISSUE = gql`
  mutation createIssue($repositoryId: ID!, $title: String!, $body: String) {
    createIssue(
      input: { repositoryId: $repositoryId, title: $title, body: $body }
    ) {
      issue {
        id
        title
        url
      }
    }
  }
`;
