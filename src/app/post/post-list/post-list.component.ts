import { selectAllPosts, selectAllPostsCount } from 'src/state/post/post.selector';

import { AppState } from 'src/state/app.state';
import { Component } from '@angular/core';
import { PostRequest } from '../_model/request/post-request.model';
import { Store } from '@ngrx/store';
import { postActions } from 'src/state/post/post.actions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  allPosts$ = this._store.select(selectAllPosts);
  allPostsCount$ = this._store.select(selectAllPostsCount);

  constructor(private _store: Store<AppState>) {
    let request = {} as PostRequest;
    request = {
      ...request,
      paginate: {
        limit: 25,
        page: 1,
      },
    };

    this._store.dispatch(postActions.loadPosts({ request }));

    this.allPosts$.subscribe((x) => console.log('x', x));
  }
}
