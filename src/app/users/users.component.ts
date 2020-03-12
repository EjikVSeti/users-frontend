import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterService } from 'angular2-toaster';

import { UsersService } from './services/users.service';
import { IResponseGetUsers, IUserModel } from './users.type';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  private isComponentAlive = true;
  private currentPage = 1;

  public pages: number[] = [];
  public usersList: IResponseGetUsers;
  public source: LocalDataSource;
  public settings = {
    actions: {
      add: false,
      edit: false,
      delete: true,
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        filter: false,
      },
      name: {
        title: 'Name'
      },
      surname: {
        title: 'Surname'
      },
      email: {
        title: 'Email'
      },
      remove: {
        filter: false,
        type: 'action'
      }
    }
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private toaster: ToasterService,
  ) {
    this.usersService.getAllUsers({ pagination: { page: this.currentPage } });
    this.usersService.isLoading$.pipe(
      takeWhile(() => this.isComponentAlive),
    ).subscribe();

    this.usersService.availableUsers$.pipe(
      takeWhile(() => this.isComponentAlive),
    ).subscribe((res) => {
      this.usersList = res.data;
      this.source = new LocalDataSource(this.usersList.list);
      this.source.remove = this.remove.bind(this);
      this.source.setPaging(res.data.currentPage, res.data.totalPage);
      this.pages = Array(this.usersList.totalPage).fill(1).map((x, i) => i + 1);
    });
  }

  public onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'name',
        search: query
      },
      {
        field: 'surname',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false);
  }

  public remove(event: IUserModel): any {
    return this.usersService.deleteUser(event.id).subscribe(
      () => {
        this.toaster.popAsync('success', 'User was created successfully');
        this.usersService.getAllUsers({ pagination: {page: this.currentPage }});
      },
      () => {
        this.toaster.popAsync('error', 'Error occurred while creating new user');
      },
    );
  }

  public create(event: any): void {
    this.router.navigate(['/users/create'], { queryParams: { ...event.data } });
  }


  public setCurrentPage(page: number) {
    this.currentPage = page;
    this.usersService.getAllUsers({ pagination: { page: this.currentPage } });
  }

  public ngOnDestroy(): void {
    this.isComponentAlive = false;
  }
}
