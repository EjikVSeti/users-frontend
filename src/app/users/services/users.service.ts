import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

import { UsersProviders } from '../providers/users.providers';
import { IGetUserRequest, IResponseAllUsers, IResponseUser, IUserModel } from '../users.type';
import { finalize } from 'rxjs/operators';

@Injectable()
export class UsersService {
  private usersListSubject: ReplaySubject<IResponseAllUsers> = new ReplaySubject(1);
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private userProvider: UsersProviders) {}

  public get availableUsers$(): Observable<IResponseAllUsers> {
    return this.usersListSubject.asObservable();
  }

  public createUser(req: IUserModel): Observable<IResponseUser> {
    this.isLoading$.next(true);
    return this.userProvider.createUser(req).pipe(
      finalize(() => this.isLoading$.next(false)),
    );
  }

  public deleteUser(id: string): Observable<IResponseUser> {
    this.isLoading$.next(true);
    return this.userProvider.removeUser(id)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
      );
  }

  public getAllUsers(req: IGetUserRequest): void {
    this.isLoading$.next(true);
    this.userProvider.getAllUsers(req)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe((usersList) => {
      this.usersListSubject.next(usersList);
    });
  }
}
