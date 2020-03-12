import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { IGetUserRequest, IResponseAllUsers, IResponseGetUsers, IResponseUser, IUserModel, URLS } from '../users.type';

@Injectable()
export class UsersProviders {
  constructor(private http: HttpClient) {}

  public getAllUsers(req: IGetUserRequest): Observable<IResponseAllUsers> {
    return this.http.get(this.prepareGetURL(URLS.user, [`pagination[page]=${req.pagination.page}`]))
      .pipe(
        switchMap((response: IResponseGetUsers) => of(response)),
        map(res => ({ success: true, data: res })),
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  public createUser(req: IUserModel): Observable<IResponseUser | any> {
    return this.http.post(URLS.user, req)
      .pipe(
        switchMap((response: IResponseUser) => of(response)),
        map(res => ({ success: true, data: res })),
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  public removeUser(id: string): Observable<IResponseUser | any> {
    return this.http.delete(`${URLS.user}/${id}`)
      .pipe(
        switchMap((response: IResponseUser) => of(response)),
        map(res => ({ success: true, data: res })),
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  private prepareGetURL(url: string, data: any = []): string {
    const query = data
      .reduce((previous, key) => {
        return (previous ? previous + '&' : '') + key;
      }, '');

    return `${url}${query ? `?${query}` : ''}`;
  }
}
