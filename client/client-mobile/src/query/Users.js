import { gql } from "@apollo/client";

export const POST_REGISTER = gql`
  mutation Mutation($userPayload: userPayload) {
    registerUser(userPayload: $userPayload) {
      access_token
      message
      error
    }
  }
`;

export const POST_LOGIN = gql`
  mutation Mutation($userPayload: userPayload) {
    loginUser(userPayload: $userPayload) {
      access_token
      error
      message
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query Query($userId: ID) {
    getUserById(userId: $userId) {
      address
      email
      id
      phoneNumber
      username
    }
  }
`;
