import { v4 as uuidv4, validate } from 'uuid';
import { CreateUserData, MyError, UpdateUserData, User } from './models';

class Controller {
  users: User[];

  constructor() {
    this.users = [];
  }

  async getUsers(): Promise<User[]> {
    return new Promise((resolve) => resolve(this.users));
  }

  async getUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!validate(id)) {
        reject(new MyError(400, `User id is invalid (not uuid)`));
      }

      const user = this.users.find((user) => user.id === id);

      if (user) {
        resolve(user);
      } else {
        reject(new MyError(404, `User with id ${id} not found`));
      }
    });
  }

  async createUser(data: any): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!data.username) {
        reject(
          new MyError(
            400,
            'Request body does not contain required username field'
          )
        );
      } else if (!data.age) {
        reject(
          new MyError(400, 'Request body does not contain required age field')
        );
      } else if (!data.hobbies) {
        reject(
          new MyError(
            400,
            'Request body does not contain required hobbies field'
          )
        );
      } else {
        const newUser: User = {
          id: uuidv4(),
          username: data.username,
          age: data.age,
          hobbies: data.hobbies
        };

        this.users = [...this.users, newUser];

        resolve(newUser);
      }
    });
  }

  async updateUser(id: string, data: any): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!data.username) {
        reject(
          new MyError(
            400,
            'Request body does not contain required username field'
          )
        );
      } else if (!data.age) {
        reject(
          new MyError(400, 'Request body does not contain required age field')
        );
      } else if (!data.hobbies) {
        reject(
          new MyError(
            400,
            'Request body does not contain required hobbies field'
          )
        );
      } else {
        if (!validate(id)) {
          reject(new MyError(400, `User id is invalid (not uuid)`));
        }

        const user = this.users.find((user) => user.id === id);

        if (!user) {
          reject(new MyError(404, `User with id ${id} not found`));
        }

        const updatedUser: User = { ...user, ...data };

        this.users = this.users.map((user) =>
          user.id === id ? updatedUser : user
        );

        resolve(updatedUser);
      }
    });
  }

  async deleteUser(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!validate(id)) {
        reject(new MyError(400, `User id is invalid (not uuid)`));
      }

      const user = this.users.find((user) => user.id === id);

      if (!user) {
        reject(new MyError(404, `User with id ${id} not found`));
      }

      // TODO test this functional.
      this.users = this.users.filter((user) => user.id !== id);

      resolve('User deleted successfully');
    });
  }
}

export default Controller;
