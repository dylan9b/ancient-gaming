import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { PostListComponent } from './post-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  exports: [PostListComponent],
})
export class PostListModule {}
