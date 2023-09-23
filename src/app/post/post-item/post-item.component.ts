import { Component, OnDestroy } from '@angular/core';

import { AppState } from 'src/state/app.state';
import { CTA_ACTION_STATES } from 'src/shared/status';
import { Store } from '@ngrx/store';
import { ctaActions } from 'src/state/cta/cta.actions';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnDestroy {
  constructor(private _store: Store<AppState>) {}

  ngOnDestroy(): void {
    this._store.dispatch(
      ctaActions.updateCTA({ action: CTA_ACTION_STATES.PENDING })
    );
  }
}
