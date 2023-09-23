import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PostComponent } from './post.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts/list',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    children: [
      {
        path: '',
        component: PostComponent,
      },
      {
        path: 'list',
        component: PostListComponent,
      },
      {
        path: 'new',
        component: PostItemComponent,
      },
      {
        path: ':id',
        component: PostItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
