import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  PostItemResponse,
  PostResponse,
} from 'src/app/post/_model/response/post-response.model';
import {
  catchError,
  from,
  map,
  of,
  pipe,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { selectAllPosts, selectAllPostsCount } from './post.selector';

import { AppState } from '../app.state';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostResourceService } from '@services/post-resource.service';
import { Store } from '@ngrx/store';
import { postActions } from './post.actions';

@Injectable()
export class PostEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _postService: PostResourceService,
    private _snackBar: MatSnackBar
  ) {}

  allPosts$ = this._store.select(selectAllPosts);
  allPostsCount$ = this._store.select(selectAllPostsCount);

  loadPosts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(postActions.loadPosts),
      withLatestFrom(this.allPosts$, this.allPostsCount$),
      switchMap(([action, statePosts, stateCount]) => {
        console.log('statecount', stateCount);
        if (statePosts?.length && action?.request?.paginate?.page === 1) {
          let storedData = {} as PostResponse;
          storedData = {
            ...storedData,
            data: [...statePosts],
            meta: { totalCount: stateCount },
          };

          return of(postActions.loadPostsSuccess({ posts: storedData }));
        }
        return from(this._postService.getPosts$(action.request)).pipe(
          map((posts) => {
            let test = {} as PostResponse;
            test = {
              ...test,
            };

            if (stateCount != null) {
              const newItems = stateCount - posts?.meta?.totalCount;

              if (newItems > 0) {
                for (let i = 0; i < newItems; i++) {
                  const toAdd = statePosts[i];
                  test = {
                    ...test,
                    data: [toAdd, ...posts.data],
                  };
                }

                const updatedCount = posts?.meta?.totalCount + newItems;
                test = {
                  ...test,
                  meta: { totalCount: updatedCount },
                };
              } else {
                test = {
                  ...posts,
                };
              }
            } else {
              test = {
                ...posts,
              };
            }

            return postActions.loadPostsSuccess({ posts: test });
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
