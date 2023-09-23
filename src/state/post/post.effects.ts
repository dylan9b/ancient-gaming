import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  from,
  map,
  of,
  pipe,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { AppState } from '../app.state';
import { Injectable } from '@angular/core';
import { PostResourceService } from '@services/post-resource.service';
import { Store } from '@ngrx/store';
import { postActions } from './post.actions';
import { selectAllPosts } from './post.selector';

@Injectable()
export class PostEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _postService: PostResourceService
  ) {}

  allPosts$ = this._store.select(selectAllPosts);

  loadPosts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.loadPosts),
      // withLatestFrom(this.allPosts$),
      switchMap((action) => {
        // if (posts && posts?.data?.length > 0) {
        //   return of(postActions.loadPostsSuccess({ posts: posts }));
        // }
        return from(this._postService.getPosts$(action.request)).pipe(
          map((posts) => postActions.loadPostsSuccess({ posts: posts })),
          catchError((error) => {
            debugger;
            return of(postActions.loadPostsFail({ error }));
          })
        );
      })
    )
  );
}
