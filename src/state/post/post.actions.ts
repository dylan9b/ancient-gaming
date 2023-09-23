import { PostErrorResponse, PostItemResponse, PostResponse } from 'src/app/post/_model/response/post-response.model';
import { createActionGroup, props } from '@ngrx/store';

import { PostRequest } from 'src/app/post/_model/request/post-request.model';

export const postActions = createActionGroup({
  source: 'POSTS',
  events: {
    // GET POSTS
    'Load Posts': props<{ request: PostRequest | null}>(),
    'Load Posts Success': props<{ posts: PostResponse }>(),
    'Load Posts Fail': props<{ error: PostErrorResponse }>(),

    // UPDATE NOTE
    //   'Update Note': props<{ note: INoteResponse }>(),
    //   'Update Note Success': props<{ note: INoteResponse }>(),
    //   'Update Note Fail': props<{ error: string }>(),

    // ARCHIVE NOTE
    //   'Archive Note': props<{ id: string }>(),
    //   'Archive Note Success': props<{ note: INoteResponse }>(),
    //   'Archive Note Fail': props<{ error: string }>(),

    // POST NOTE
    //   'Post Note': props<{ note: INoteResponse }>(),
    //   'Post Note Success': props<{ note: INoteResponse }>(),
    //   'Post Note Fail': props<{ error: string }>(),

    // SELECT NOTE
    //   'Select Note': props<{ note: INoteResponse }>(),
    //   'Select Note Success': props<{ note: INoteResponse }>(),
    //   'Select Note Fail': props<{ error: string }>(),
  },
});
