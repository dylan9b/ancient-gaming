import {
  selectAllPosts,
  selectAllPostsCount,
  selectStatus,
} from 'src/state/post/post.selector';

import { Animations } from 'src/animations/animations';
import { AppState } from 'src/state/app.state';
import { CTA_ACTION_STATES } from 'src/shared/status';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PostItemResponse } from '../_model/response/post-response.model';
import { PostRequest } from '../_model/request/post-request.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ctaActions } from 'src/state/cta/cta.actions';
import { postActions } from 'src/state/post/post.actions';
import { selectCta } from 'src/state/cta/cta.selectors';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: [Animations.cta],
})
export class PostListComponent {
  allPosts$ = this._store.select(selectAllPosts);

  allPostsCount$ = this._store.select(selectAllPostsCount);
  status$ = this._store.select(selectStatus);
  cta$ = this._store.select(selectCta);

  displayedColumns: string[] = ['id', 'title'];
  pageSizeOptions: number[] = [15, 20, 25];
  searchTerm: string = '';

  selectedPostToDelete: string = '';

  constructor(private _store: Store<AppState>, private _router: Router) {
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

  onPostClick(cta: string, post: PostItemResponse): void {
    this._store.dispatch(
      ctaActions.updateCTA({ action: CTA_ACTION_STATES.PENDING })
    );
    
    if (cta === CTA_ACTION_STATES.PENDING) {
      this._router.navigate(['/posts', post?.id]);
    }
  }

  deletePost(id: string): void {
    this.selectedPostToDelete = id;
    this._store.dispatch(postActions.deletePost({ id }));
    this._store.dispatch(
      ctaActions.updateCTA({ action: CTA_ACTION_STATES.DELETE })
    );
  }

  searchPosts(input: Event): void {
    const searchTerm = (input?.target as HTMLInputElement)?.value || '';

    this.searchTerm = searchTerm;
    let request = {} as PostRequest;

    request = {
      ...request,
      search: {
        q: searchTerm,
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

    if (this.searchTerm.length) {
      request = {
        ...request,
        search: {
          q: this.searchTerm,
        },
      };
    }
    this._store.dispatch(postActions.loadPosts({ request }));
  }

  onAddPost(): void {
    this._store.dispatch(
      ctaActions.updateCTA({ action: CTA_ACTION_STATES.ADD })
    );
  }

  onAddPostAnimationEnd(action: string): void {
    if (action === CTA_ACTION_STATES.ADD) {
      this._router.navigate(['/posts', 'new']);
    }
  }

  postTrackByFn(index: number, post: PostItemResponse): string {
    return post?.id;
  }
}
