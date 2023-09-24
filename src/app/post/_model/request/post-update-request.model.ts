import { PostCreateRequest } from './post-create-request.model';

export interface PostUpdateRequest extends PostCreateRequest {
  id: string;
}
