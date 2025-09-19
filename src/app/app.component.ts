import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'avi-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="tw-py-5">
      <a routerLink="/">
        <h1 class="title">AVI Photos</h1>
      </a>
    </header>
    <router-outlet />
  `,
  styles: `
    :host {
      @apply tw-grid tw-gap-2 tw-px-5 tw-pb-20;
    }
    .title {
      @apply tw-text-3xl tw-font-medium tw-text-center tw-text-black;
    }
  `,
})
export class AppComponent {}
