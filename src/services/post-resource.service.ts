import { Injectable, Pipe, isDevMode } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import {
  PostErrorResponse,
  PostItemResponse,
  PostResponse,
} from '../app/post/_model/response/post-response.model';

import { Apollo } from 'apollo-angular';
import { CREATE_POST } from 'src/graphql/mutations/post-create.mutation';
import { DELETE_POST } from 'src/graphql/mutations/post-delete.mutation';
import { GET_POSTS } from 'src/graphql/queries/posts.query';
import { PUT_POST } from 'src/graphql/mutations/post-update.mutation';
import { PostCreateRequest } from 'src/app/post/_model/request/post-create-request.model';
import { PostDeleteResponse } from 'src/app/post/_model/response/post-delete-response.model';
import { PostRequest } from 'src/app/post/_model/request/post-request.model';
import { PostUpdateRequest } from 'src/app/post/_model/request/post-update-request.model';

@Injectable({
  providedIn: 'root',
})
export class PostResourceService {
  constructor(private _apollo: Apollo) {}

  getPosts$(request: PostRequest | null): Observable<PostResponse> {
    return this._apollo
      .query<{ posts: PostResponse }>({
        query: GET_POSTS,
        variables: { options: { ...request } },
      })
      .pipe(
        map((response) => {
          debugger;
          return response.data.posts;
        }),
        catchError((error) => {
          debugger;
          throw error;
        })
      );
  }

  updatePost$(request: PostUpdateRequest | null): Observable<PostItemResponse> {
    return this._apollo
      .mutate<{ updatePost: PostItemResponse }>({
        mutation: PUT_POST,
        variables: {
          id: request?.id,
          input: {
            title: request?.title,
            body: request?.body,
          },
        },
      })
      .pipe(
        map((response) => {
          return response.data?.updatePost || ({} as PostItemResponse);
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  createPost$(request: PostCreateRequest | null): Observable<PostItemResponse> {
    return this._apollo
      .mutate<{ createPost: PostItemResponse }>({
        mutation: CREATE_POST,
        variables: {
          input: {
            title: request?.title,
            body: request?.body,
          },
        },
      })
      .pipe(
        map((response) => {
          return response.data?.createPost || ({} as PostItemResponse);
        }),
        catchError((error) => {
          throw error;
        })
      );
  }

  deletePost$(id: string): Observable<PostDeleteResponse> {
    return this._apollo
      .mutate<{ deletePost: boolean }>({
        mutation: DELETE_POST,
        variables: { id },
      })
      .pipe(
        map((response) => {
          return {
            isDeleted: response?.data?.deletePost || false,
            id,
          };
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
}
