import { AppState } from 'src/state/app.state';
import { Injectable } from '@angular/core';
import { PostRequest } from 'src/app/post/_model/request/post-request.model';
import { Store } from '@ngrx/store';
import { postActions } from 'src/state/post/post.actions';

@Injectable({ providedIn: 'root' })

export class PostUtilService {
  constructor(private _store: Store<AppState>) {}

  loadPosts(): void {
    let request = {} as PostRequest;
    request = {
      ...request,
      paginate: {
        limit: 15,
        page: 1,
      },
    };

    this._store.dispatch(postActions.loadPosts({ request }));
  }
}
