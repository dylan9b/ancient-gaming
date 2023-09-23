import { createReducer, on } from '@ngrx/store';

import { PostState } from './post.state';
import { STATUS } from 'src/shared/status';
import { postActions } from './post.actions';

export const initialState: PostState = {
  posts: null,
  error: null,
  status: STATUS.PENDING,
};

export const postReducer = createReducer(
  initialState,

  // GET POSTS
  on(postActions.loadPosts, (state) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(postActions.loadPostsSuccess, (state, { posts }) => {
    let updatedPosts = {};

    // for (let item of Object.keys(posts)) {
    //   let updatedItem = Object.assign({}, posts[item], {
    //     isSelected: false,
    //   });

    //   updatedPosts = {
    //     ...updatedPosts,
    //     [updatedItem.id]: { ...updatedItem },
    //   };
    // }

    return {
      ...state,
      //   posts: updatedPosts,
      posts: posts,
      error: null,
      status: STATUS.SUCCESS,
    };
  }),
  on(postActions.loadPostsFail, (state, { error }) => ({
    ...state,
    error: { ...error },
    status: STATUS.ERROR,
  }))
);
