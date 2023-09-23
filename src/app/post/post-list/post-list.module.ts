import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list.component';

@NgModule({
  declarations: [PostListComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [PostListComponent],
})
export class PostListModule {}
