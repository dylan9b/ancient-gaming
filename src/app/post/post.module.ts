import { NgModule } from '@angular/core';
import { PostComponent } from './post.component';
import { PostItemModule } from './post-item/post-item.module';
import { PostListModule } from './post-list/post-list.module';
import { PostsRoutingModule } from './post-routing.module';

@NgModule({
  imports: [PostItemModule, PostListModule, PostsRoutingModule],
  declarations: [PostComponent],
  providers: [],
  bootstrap: [PostComponent],
})
export class PostModule {}
