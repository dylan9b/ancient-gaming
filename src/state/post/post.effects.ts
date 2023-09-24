import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { selectAllPosts, selectAllPostsCount } from './post.selector';

import { AppState } from '../app.state';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostItemResponse } from 'src/app/post/_model/response/post-response.model';
import { PostResourceService } from '@services/post-resource.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { postActions } from './post.actions';

@Injectable()
export class PostEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _postService: PostResourceService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  allPosts$ = this._store.select(selectAllPosts);
  allPostsCount$ = this._store.select(selectAllPostsCount);

  loadPosts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.loadPosts),
      switchMap((action) => {
        return from(this._postService.getPosts$(action.request)).pipe(
          map((posts) => {
            return postActions.loadPostsSuccess({
              posts,
              request: action.request,
            });
          }),
          catchError((error) => of(postActions.loadPostsFail({ error })))
        );
      })
    )
  );

  createPost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.createPost),
      switchMap((action) => {
        return from(this._postService.createPost$(action.post)).pipe(
          map((post) => {
            this._snackBar.open('Post successfully created!', 'Success', {
              panelClass: 'status__200',
            });

            return postActions.createPostSuccess({ post });
          }),
          switchMap((result) => {
            this._router.navigate(['/posts', result?.post?.id]);
            return of(result);
          }),
          catchError((error) => of(postActions.createPostFail({ error })))
        );
      })
    )
  );

  updatePost$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.updatePost),
      switchMap((action) => {
        if (+action.post.id <= 100) {
          return from(this._postService.updatePost$(action.post)).pipe(
            map((post) => {
              this._snackBar.open('Post successfully updated!', 'Success', {
                panelClass: 'status__200',
              });

              return postActions.updatePostSuccess({ post });
            }),
            catchError((error) => of(postActions.updatePostFail({ error })))
          );
        } else {
          let data = {} as PostItemResponse;
          data = {
            ...data,
            body: action.post.body,
            title: action.post.title,
            id: action.post.id,
          };

          this._snackBar.open('Post successfully updated!', 'Success', {
            panelClass: 'status__200',
          });

          return of(postActions.updatePostSuccess({ post: data }));
        }
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
