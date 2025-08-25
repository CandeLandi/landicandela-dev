import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

export const fadeSlideIn = (name = 'fadeSlideIn') =>
  trigger(name, [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(8px)' }),
      animate('260ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ]);

export const listStagger = trigger('listStagger', [
  transition(':enter', [
    query(':scope > *', [
      style({ opacity: 0, transform: 'translateY(8px)' }),
      stagger(60, animate('260ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 1, transform: 'translateY(0)' })))
    ], { optional: true })
  ])
]);

export const expandY = trigger('expandY', [
  state('collapsed', style({ height: '0px', overflow: 'hidden', opacity: 0 })),
  state('expanded',  style({ height: '*',   overflow: 'hidden', opacity: 1 })),
  transition('collapsed <=> expanded', animate('200ms cubic-bezier(0.22,1,0.36,1)')),
]);

export const routeAnim = trigger('routeAnim', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    query(':leave', [
      animate('180ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 0, transform: 'translateY(-8px)' }))
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(8px)' }),
      animate('220ms 60ms cubic-bezier(0.22,1,0.36,1)',
        style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);

