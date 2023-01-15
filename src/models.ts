export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface CreateUserData {
  username: string;
  age: number;
  hobbies: string[];
}

export interface UpdateUserData {
  username?: string;
  age?: number;
  hobbies?: string[];
}

export interface IError {
  status: number;
  message: string;
}

export class MyError implements IError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
