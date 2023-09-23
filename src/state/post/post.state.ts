import { PostErrorResponse, PostResponse } from 'src/app/post/_model/response/post-response.model';

export interface PostState {
  posts: PostResponse;
  error: PostErrorResponse | null;
  status: string;
}
