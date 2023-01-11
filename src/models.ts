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
