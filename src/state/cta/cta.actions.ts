import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ctaActions = createActionGroup({
  source: 'CTA',
  events: {
    // GET CTA
    'Load CTA': emptyProps(),
    'Load CTA Success': props<{ action: string}>(),
    'Load CTA Fail': props<{ error: string }>(),

    // UPDATE CTA
    'Update CTA': props<{ action: string }>(),
    'Update CTA Success': props<{ action: string }>(),
    'Update CTA Fail': props<{ error: string }>(),
  },
});