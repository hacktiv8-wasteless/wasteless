import { gql } from "@apollo/client";

export const POST_APPOINTMENT = gql`
  mutation Mutation($postId: ID) {
    createAppointment(post_id: $postId) {
      access_token
      id
      message
      error
    }
  }
`;

export const GET_APPOINTMENT = gql`
  query Query($postId: ID) {
    getAppointment(post_id: $postId) {
      _id
      userId
      username
      email
      phoneNumber
      postId
    }
  }
`;

export const CHOOSE_APPOINTMENT = gql`
  mutation Mutation($takerId: String, $postId: ID) {
    chooseAppointment(taker_id: $takerId, post_id: $postId) {
      message
    }
  }
`;
