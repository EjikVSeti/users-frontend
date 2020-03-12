import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: NotFoundComponent,
        data: {
          name: '404',
          meta: {
            title: 'Not Found',
            description: 'Page not found',
          },
        },
      }
    ])
  ],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent, RouterModule],
})
export class NotFoundModule {}
