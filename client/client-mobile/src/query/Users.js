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
  mutation LoginUser($userPayload: userPayload) {
    loginUser(userPayload: $userPayload) {
      access_token
      error
      id
      message
      username
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query GetUserById($userId: ID) {
    getUserById(userId: $userId) {
      id
      username
      email
      phoneNumber
      address
    }
  }
`;

export const GET_PROFILE = gql`
  query GetAllPosts {
    getProfile {
      id
      username
      email
      password
      phoneNumber
      address
      balance
      points
    }
  }
`;
