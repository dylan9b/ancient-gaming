import { AppState } from '../app.state';
import { PostState } from './post.state';
import { createSelector } from '@ngrx/store';

export const selectPostsState = (state: AppState) => state?.posts;

export const selectAllPosts = createSelector(
  selectPostsState,
  (state: PostState) => state?.posts?.data
);

export const selectAllPostsCount = createSelector(
  selectPostsState,
  (state: PostState) => state?.posts?.meta?.totalCount
);

export const selectPost = (id: string) =>
  createSelector(selectPostsState, (state: PostState) => {
    return state?.posts?.data?.find((post) => post?.id === id) || null; 
  });

export const selectStatus = createSelector(
  selectPostsState,
  (state: PostState) => state?.status
);
