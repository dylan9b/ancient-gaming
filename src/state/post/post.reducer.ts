import { createReducer, on } from '@ngrx/store';

import { PostResponse } from 'src/app/post/_model/response/post-response.model';
import { PostState } from './post.state';
import { STATUS } from 'src/shared/status';
import { postActions } from './post.actions';

export const initialState: PostState = {
  posts: {} as PostResponse,
  error: null,
  status: STATUS.PENDING,
  deletedPosts: [],
};

export const postReducer = createReducer(
  initialState,

  // GET POSTS
  on(postActions.loadPosts, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(postActions.loadPostsSuccess, (state, { posts }) => {
    if (posts?.data) {
      const updatedPosts = posts?.data?.filter(
        (post) => !state?.deletedPosts?.includes(post?.id)
      );
      const updatedTotalCount =
        posts?.meta?.totalCount - state?.deletedPosts?.length;

      return {
        ...state,
        posts: {
          ...posts,
          data: [...updatedPosts],
          meta: { totalCount: updatedTotalCount },
        },
        error: null,
        status: STATUS.SUCCESS,
      };
    }

    return {
      ...state,
      posts: posts,
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(postActions.loadPostsFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    status: STATUS.ERROR,
  })),

  // UPDATE POST
  on(postActions.updatePost, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(postActions.updatePostSuccess, (state, { post }) => {
    const updatedPosts = state.posts.data.map((item) => {
      if (item.id !== post.id) return item;

      return {
        ...item,
        ...post,
      };
    });

    return {
      ...state,
      posts: {
        ...state.posts,
        data: [...updatedPosts],
      },
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(postActions.updatePostFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    status: STATUS.ERROR,
  })),

  // CREATE POST
  on(postActions.createPost, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(postActions.createPostSuccess, (state, { post }) => {
    const updatedPosts = [post, ...state.posts.data];
    const updatedCount = state.posts.meta.totalCount + 1;

    return {
      ...state,
      posts: {
        ...state.posts,
        data: [...updatedPosts],
        meta: {
          totalCount: updatedCount,
        },
      },
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(postActions.createPostFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    status: STATUS.ERROR,
  })),

  // DELETE POSTS
  on(postActions.deletePost, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(postActions.deletePostSuccess, (state, { post }) => {
    if (post.isDeleted) {
      const updatedPosts = state?.posts?.data?.filter(
        (item) => item.id !== post?.id
      );

      const updatedCount = state.posts.meta.totalCount - 1;

      return {
        ...state,
        posts: {
          ...state.posts,
          data: [...updatedPosts],
          meta: { totalCount: updatedCount },
        },
        deletedPosts: [...state.deletedPosts, post.id],
        error: null,
        status: STATUS.SUCCESS,
      };
    }

    return state;
  }),
  on(postActions.deletePostFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    status: STATUS.ERROR,
  }))
);
