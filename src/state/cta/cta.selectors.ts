import { AppState } from '../app.state';
import { CTAState } from './cta.state';
import { createSelector } from '@ngrx/store';

export const selectCtaState = (state: AppState) => state?.cta;

export const selectCta = createSelector(
  selectCtaState,
  (state: CTAState) => state?.action
);
