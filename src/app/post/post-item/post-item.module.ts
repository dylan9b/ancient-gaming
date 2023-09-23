import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { PostItemComponent } from './post-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule
  ],
  exports: [PostItemComponent],
})
export class PostItemModule {}
