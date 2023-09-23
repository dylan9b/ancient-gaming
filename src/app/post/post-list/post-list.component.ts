import { map, of } from 'rxjs';
import {
  selectAllPosts,
  selectAllPostsCount,
  selectStatus,
} from 'src/state/post/post.selector';

import { AppState } from 'src/state/app.state';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { PostItemResponse } from '../_model/response/post-response.model';
import { PostRequest } from '../_model/request/post-request.model';
import { Store } from '@ngrx/store';
import { postActions } from 'src/state/post/post.actions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  allPosts$ = this._store.select(selectAllPosts).pipe(
    map((response) => {
      const dataSource = new MatTableDataSource<PostItemResponse>();
      dataSource.data = response!;
      return dataSource;
    })
  );

  allPostsCount$ = this._store.select(selectAllPostsCount);
  status$ = this._store.select(selectStatus);

  displayedColumns: string[] = ['id', 'title', 'user'];
  pageSizeOptions: number[] = [15, 20, 25];

  constructor(private _store: Store<AppState>) {
    let request = {} as PostRequest;
    request = {
      ...request,
      paginate: {
        limit: this.pageSizeOptions[0],
        page: 1,
      },
    };

    this._store.dispatch(postActions.loadPosts({ request }));
  }

  handlePageEvent(event: PageEvent): void {
    let request = {} as PostRequest;
    request = {
      ...request,
      paginate: {
        limit: event.pageSize,
        page: event.pageIndex + 1,
      },
    };

    debugger;

    this._store.dispatch(postActions.loadPosts({ request }));
  }
}
