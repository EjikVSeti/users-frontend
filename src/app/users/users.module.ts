import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NbSpinnerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersComponent } from './users.component';
import { UsersProviders } from './providers/users.providers';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full',
      },
      {
        path: 'users/create',
        component: CreateUserComponent,
        pathMatch: 'full',
      },
    ]),
    ToasterModule.forChild(),
],
  providers: [UsersProviders, UsersService],
  declarations: [UsersComponent, CreateUserComponent],
  exports: [UsersComponent, RouterModule, ToasterModule],
})
export class UsersModule {}
