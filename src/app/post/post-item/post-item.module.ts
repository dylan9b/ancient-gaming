import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostItemComponent } from './post-item.component';

@NgModule({
  declarations: [PostItemComponent],
  imports: [CommonModule],
  exports: [PostItemComponent],
})
export class PostItemModule {}
