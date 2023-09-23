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
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostResourceService } from '@services/post-resource.service';
import { Store } from '@ngrx/store';
import { postActions } from './post.actions';
import { selectAllPosts } from './post.selector';

@Injectable()
export class PostEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _postService: PostResourceService,
    private _snackBar: MatSnackBar
  ) {}

  allPosts$ = this._store.select(selectAllPosts);

  loadPosts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.loadPosts),
      switchMap((action) => {
        return from(this._postService.getPosts$(action.request)).pipe(
          map((posts) => postActions.loadPostsSuccess({ posts: posts })),
          catchError((error) => of(postActions.loadPostsFail({ error })))
        );
      })
    )
  );

  updatePost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.updatePost),
      switchMap((action) => {
        return from(this._postService.updatePost$(action.post)).pipe(
          map((post) => {
            this._snackBar.open('Post successfully updated!', 'Success', {
              panelClass: 'status__200',
            });

            return postActions.updatePostSuccess({ post });
          }),
          catchError((error) => of(postActions.deletePostFail({ error })))
        );
      })
    )
  );

  deletePost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.deletePost),
      switchMap((action) => {
        return from(this._postService.deletePost$(action.id)).pipe(
          map((post) => {
            this._snackBar.open('Post successfully deleted!', 'Success', {
              panelClass: 'status__200',
            });

            return postActions.deletePostSuccess({ post });
          }),
          catchError((error) => of(postActions.deletePostFail({ error })))
        );
      })
    )
  );
}
