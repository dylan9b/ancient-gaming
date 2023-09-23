import { gql } from 'apollo-angular';

export const DELETE_POST = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;
