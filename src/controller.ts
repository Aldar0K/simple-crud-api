import { v4 as uuidv4 } from 'uuid';
import { CreateUserData, UpdateUserData, User } from './models';

const users: User[] = [];

class Controller {
  async getUsers() {
    return new Promise((resolve) => resolve(users));
  }

  async getUser(id: string) {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.id === id);

      if (user) {
        resolve(user);
      } else {
        reject(new Error(`User with id ${id} not found `));
      }
    });
  }

  async createUser(data: CreateUserData) {
    return new Promise((resolve) => {
      const newUser: User = {
        id: uuidv4(),
        ...data
      };

      resolve(newUser);
    });
  }

  async updateUser(id: string, data: UpdateUserData) {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.id === id);

      if (!user) {
        reject(new Error(`User with id ${id} not found `));
      }

      // TODO test this functional.
      const updatedUser = { ...user, ...data };

      resolve(updatedUser);
    });
  }

  async deleteUser(id: string) {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.id === id);

      if (!user) {
        reject(new Error(`User with id ${id} not found `));
      }

      resolve('User deleted successfully');
    });
  }
}

export default Controller;
