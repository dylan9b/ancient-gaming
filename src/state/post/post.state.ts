import { PostErrorResponse, PostItemResponse, PostResponse } from 'src/app/post/_model/response/post-response.model';

export interface PostState {
  posts: PostResponse;
  error: PostErrorResponse | null;
  status: string;

  // These are included in order to keep track of the new items created/deleted throughout the state.
  deletedPosts: string[];
  addedPosts: PostItemResponse[];
}
