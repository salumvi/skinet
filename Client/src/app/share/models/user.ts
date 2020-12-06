export interface IUser {
    email: string;
    displayName: string;
    token: string;
  }

export interface IUserRegister {
    displayName: string;
    password: string;
    email: string;
  }

export interface IUserLogin {
    password: string;
    email: string;
  }


