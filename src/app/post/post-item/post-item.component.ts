import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of, switchMap } from 'rxjs';

import { AppState } from 'src/state/app.state';
import { CTA_ACTION_STATES } from 'src/shared/status';
import { PostItemFormControl } from './_model/post-item-form-control.model';
import { PostItemResponse } from '../_model/response/post-response.model';
import { PostItemValidation } from './_model/post-item-validation.model';
import { PostUpdateRequest } from '../_model/request/post-update-request.model';
import { PostUtilService } from '@services/post-util.service';
import { Store } from '@ngrx/store';
import { ctaActions } from 'src/state/cta/cta.actions';
import { postActions } from 'src/state/post/post.actions';
import { selectPost } from 'src/state/post/post.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit, OnDestroy {
  post$!: Observable<PostItemResponse | null>;
  destroyRef = inject(DestroyRef);
  form!: FormGroup;
  post!: PostItemResponse | null;
  validation!: PostItemValidation;

  constructor(
    private _store: Store<AppState>,
    private _route: ActivatedRoute,
    private _postUtilService: PostUtilService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeRouteParams();
  }

  ngOnDestroy(): void {
    this._store.dispatch(
      ctaActions.updateCTA({ action: CTA_ACTION_STATES.PENDING })
    );
  }

  /**
   * Initialize the post.
   */
  private subscribeRouteParams(): void {
    this._route.params
      .pipe(
        map((params) => {
          const { id } = params;
          return id as string;
        }),
        switchMap((id) => {
          if (id) {
            this.post$ = this._store.select(selectPost(id));
            return this.post$.pipe(
              map((post) => {
                return { post, id };
              })
            );
          }

          return of({ post: null, id });
        }),
        switchMap((data) => {
          const { post, id } = data;
          if (post) {
            return of(post);
          } else {
            this._postUtilService.loadPosts();
            this.post$ = this._store.select(selectPost(id));

            return this.post$;
          }
        })
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((post) => {
        this.post = post;
        this.form = this.populateForm(post);
      });
  }

  private populateForm(post: PostItemResponse | null): FormGroup {
    const form = new PostItemFormControl();

    form.id.setValue(post?.id);
    form.title.setValue(post?.title);
    form.body.setValue(post?.body);

    return this._formBuilder.group(form);
  }

  /**
   * Cancel the form.
   */
  cancelForm(): void {
    this.form = this.populateForm(this.post);
  }

  /**
   * Submit the form.
   */
  submitForm(): void {
    this.validation = new PostItemValidation(this.form);

    if (this.form?.valid && this.form?.dirty) {
      !this.post?.id ? this.addPost() : this.editPost();
      this.form.markAsPristine();
    } else {
      this.form?.markAllAsTouched();
    }
  }

  /**
   * Add a new post.
   */
  private addPost(): void {
    // const rawForm = this.form.getRawValue();
    // let newNote = {} as INoteRequest;
    // newNote = {
    //   ...newNote,
    //   title: rawForm?.title,
    //   body: rawForm?.body,
    //   dateCreated: new Date().toJSON(),
    //   dateModified: new Date().toJSON(),
    //   isComplete: false,
    //   isArchived: false,
    //   isPinned: false,
    // };
    // this._store.dispatch(noteActions.postNote({ note: newNote }));
    // this._router.navigate(['/notes', 'list']);
  }

  /**
   * Update post.
   */
  private editPost(): void {
    const rawForm = this.form.getRawValue();

    let updatedNote = {} as PostUpdateRequest;
    updatedNote = {
      id: rawForm?.id,
      title: rawForm?.title,
      body: rawForm?.body,
    };
debugger;
    this._store.dispatch(postActions.updatePost({ post: updatedNote }));
  }
}
