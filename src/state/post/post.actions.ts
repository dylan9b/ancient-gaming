import {
  PostErrorResponse,
  PostItemResponse,
  PostResponse,
} from 'src/app/post/_model/response/post-response.model';
import { createActionGroup, props } from '@ngrx/store';

import { PostCreateRequest } from 'src/app/post/_model/request/post-create-request.model';
import { PostDeleteResponse } from 'src/app/post/_model/response/post-delete-response.model';
import { PostRequest } from 'src/app/post/_model/request/post-request.model';
import { PostUpdateRequest } from 'src/app/post/_model/request/post-update-request.model';

export const postActions = createActionGroup({
  source: 'POSTS',
  events: {
    // GET POSTS
    'Load Posts': props<{ request: PostRequest | null }>(),
    'Load Posts Success': props<{ posts: PostResponse }>(),
    'Load Posts Fail': props<{ error: PostErrorResponse }>(),

    // UPDATE POST
    'Update Post': props<{ post: PostUpdateRequest }>(),
    'Update Post Success': props<{ post: PostItemResponse }>(),
    'Update Post Fail': props<{ error: PostErrorResponse }>(),

    // DELETE POST
    'Delete Post': props<{ id: string }>(),
    'Delete Post Success': props<{ post: PostDeleteResponse }>(),
    'Delete Post Fail': props<{ error: PostErrorResponse }>(),

    // CREATE POST
    'Create Post': props<{ post: PostCreateRequest }>(),
    'Create Post Success': props<{ post: PostItemResponse }>(),
    'Create Post Fail': props<{ error: PostErrorResponse }>(),
  },
});
