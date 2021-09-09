import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  template: ` <div class="indeterminate-value"></div> `,
  styles: [
    `
      :host {
        @apply w-full h-1 absolute top-0 right-0 left-0 overflow-hidden z-50;
        background-color: rgba(5, 114, 206, 0.2);
      }

      .indeterminate-value {
        @apply w-full h-full;
        background-color: rgb(5, 114, 206);
        animation: indeterminateAnimation 1s infinite linear;
        transform-origin: 0% 50%;
      }

      @keyframes indeterminateAnimation {
        0% {
          transform: translateX(0) scaleX(0);
        }
        40% {
          transform: translateX(0) scaleX(0.4);
        }
        100% {
          transform: translateX(100%) scaleX(0.5);
        }
      }
    `,
  ],
})
export class LoadingBarComponent {}
