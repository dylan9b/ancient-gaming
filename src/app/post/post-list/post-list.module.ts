import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list.component';

@NgModule({
  declarations: [PostListComponent],
  imports: [CommonModule],
  exports: [PostListComponent],
})
export class PostListModule {}
