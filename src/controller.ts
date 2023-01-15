import { v4 as uuidv4 } from 'uuid';
import { CreateUserData, UpdateUserData, User } from './models';

class Controller {
  users: User[];

  constructor() {
    this.users = [];
  }

  async getUsers() {
    return new Promise((resolve) => resolve(this.users));
  }

  async getUser(id: string) {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.id === id);

      if (user) {
        resolve(user);
      } else {
        reject(new Error(`User with id ${id} not found `));
      }
    });
  }

  async createUser(data: any): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!data.username) {
        reject(new Error('Recieved object does not have a username field'));
      } else if (!data.age) {
        reject(new Error('Recieved object does not have a age field'));
      } else if (!data.hobbies) {
        reject(new Error('Recieved object does not have a hobbies field'));
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

  async updateUser(id: string, data: UpdateUserData) {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.id === id);

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
      const user = this.users.find((user) => user.id === id);

      if (!user) {
        reject(new Error(`User with id ${id} not found `));
      }

      resolve('User deleted successfully');
    });
  }
}

export default Controller;
