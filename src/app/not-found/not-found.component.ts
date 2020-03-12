import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="text-center">
      <i class="nb-coffee-maker fas"></i>
      <div class="error">
        <h2 class="error__title">404 Not Found</h2>
        <p class="error__message">The page you were looking for can't be found.</p>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {}
