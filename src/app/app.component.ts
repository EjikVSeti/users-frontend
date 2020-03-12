import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public toasterConfig: ToasterConfig = new ToasterConfig({
    showCloseButton: true,
    timeout: 4000,
    mouseoverTimerStop: false,
    iconClasses: {
      success: 'toaster-icon-success',
      error: 'toaster-icon-error',
      info: 'toaster-icon-info',
      warning: 'toaster-icon-warning',
    },
  });}
