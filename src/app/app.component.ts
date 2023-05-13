import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      a{
        color: black;
      }
    `
  ]
})
export class AppComponent {
  title = 'angular-frontend-test';
}
