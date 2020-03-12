export interface IGetUserRequest {
  pagination: { page: number };
}

export interface IUserModel {
  id?: string;
  name: string;
  surname: string;
  email: string;
}

export interface IResponseAllUsers {
  success?: boolean;
  data: IResponseGetUsers;
}

export interface IResponseUser {
  success?: boolean;
  data?: { id: string };
}

export interface IResponseGetUsers extends IPagination {
  list: IUserModel[];
}

export interface IPagination {
  currentPage: number;
  totalPage: number;
  listTotal: number;
  total: number;
}

export const URLS = { user: 'http://localhost:3000/users' };
