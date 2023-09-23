import { Observable, catchError, map, of, throwError } from 'rxjs';
import {
  PostErrorResponse,
  PostResponse,
} from '../app/post/_model/response/post-response.model';

import { Apollo } from 'apollo-angular';
import { GET_POSTS } from 'src/graphql/resolvers/posts.resolver';
import { Injectable } from '@angular/core';
import { PostRequest } from 'src/app/post/_model/request/post-request.model';

@Injectable({
  providedIn: 'root',
})
export class PostResourceService {
  constructor(private _apollo: Apollo) {}

  getPosts$(request: PostRequest | null): Observable<PostResponse> {
    return this._apollo
      .watchQuery<{ posts: PostResponse }>({
        query: GET_POSTS,
        variables: { options: { ...request } },
      })
      .valueChanges.pipe(
        map((response) => {
          console.log('respose', response);
          return response.data.posts;
        }),
        catchError((error) => {
          console.log('error', error);

          throw error;
        })
      );
  }
}
