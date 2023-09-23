import { Injectable, Pipe } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import {
  PostDeleteResponse,
  PostErrorResponse,
  PostResponse,
} from '../app/post/_model/response/post-response.model';

import { Apollo } from 'apollo-angular';
import { DELETE_POST } from 'src/graphql/mutations/post-delete.mutation';
import { GET_POSTS } from 'src/graphql/queries/posts.query';
import { PostRequest } from 'src/app/post/_model/request/post-request.model';

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
          return response.data.posts;
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
          return  {
            isDeleted: response?.data?.deletePost || false,
            id
          }
        }),
        catchError((error) => {
          throw error;
        })
      );
  }
}
