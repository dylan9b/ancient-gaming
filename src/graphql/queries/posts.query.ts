import { gql } from 'apollo-angular';

export const GET_POSTS = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          username
        }
        comments {
          meta {
            totalCount
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;
