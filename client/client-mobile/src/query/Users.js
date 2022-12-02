import { gql } from "@apollo/client";

export const POST_LOGIN = gql`
  query Query($payload: RegisterForm) {
    loginUser(payload: $payload) {
      access_token
      message
    }
  }
`;

export const POST_REGISTER = gql`
  mutation Mutation($payload: RegisterForm) {
    registerUser(payload: $payload) {
      access_token
      message
    }
  }
`;
