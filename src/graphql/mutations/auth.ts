import gql from "graphql-tag";

export const SIGN_UP_MUTATION = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      id
      name
      email
    }
  }
`;
