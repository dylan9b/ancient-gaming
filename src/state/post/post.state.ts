import { PostErrorResponse, PostResponse } from 'src/app/post/_model/response/post-response.model';

export interface PostState {
  posts: PostResponse | null;
  error: PostErrorResponse | null;
  status: string;
}
