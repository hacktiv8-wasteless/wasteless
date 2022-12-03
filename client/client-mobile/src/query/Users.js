import { gql } from "@apollo/client";

export const POST_LOGIN = gql`
  mutation Mutation($userPayload: userPayload) {
    loginUser(userPayload: $userPayload) {
      access_token
      error
      message
    }
  }
`;

export const POST_REGISTER = gql`
  mutation Mutation($userPayload: userPayload) {
    registerUser(userPayload: $userPayload) {
      access_token
      error
      message
    }
  }
`;
