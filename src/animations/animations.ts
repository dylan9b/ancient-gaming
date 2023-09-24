import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const Animations = {
  cta: trigger('cta', [
    transition('void => cta-click', [
      animate(
        '0.15s',
        keyframes([
          style({ transform: 'scale(1)' }),
          style({
            transform: 'scale(0.9)',
            filter: 'brightness(0.55)',
          }),
          style({
            transform: 'scale(1)',
            filter: 'brightness(1)',
          }),
        ])
      ),
    ]),
  ]),
};
