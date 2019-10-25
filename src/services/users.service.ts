import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Promise } from 'bluebird';
import models from '../models';
import { RequestUserLogin, UserRegisterModel, UserLoginModel, ResponseLogin } from '../types/user.types';
import Users from '../models/users';

const users: typeof Users = models.users as typeof Users;

class UsersService {
  public static get instance(): UsersService {
    return this._instance || (this._instance = new this());
  }

  private static _instance: UsersService;

  public readonly userAttributes: Array<string>;

  private readonly _saltRounds = 12;
  private readonly _jwtSecret = '0.rfyj3n9nzh';

  constructor() {
    this.userAttributes = ['id', 'name', 'email', 'active'];
  }

  public register({ name, email, password }: UserRegisterModel): Promise<Users | null> {
    return bcrypt.hash(password, this._saltRounds).then((hash: string) => {
      return users.create({ name, email, password: hash }).then((u: any) => this.getUserById(u.id));
    });
  }

  public login({ email }: UserLoginModel): Promise<ResponseLogin> {
    return users.findOne({ where: { email } }).then((u: any) => {
      const _loginPayload: RequestUserLogin = {
        id: u.id,
        email: u.email
      };
      return { token: jwt.sign(_loginPayload, this._jwtSecret, { expiresIn: 600 }) };
    });
  }

  public verifyToken(token: string): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(token, this._jwtSecret, (errors: any) => {
        resolve(!(!!errors));
      });
    });
  }

  public getUserById(id: number): Promise<Users | null> {
    return users.findByPk(id, { attributes: this.userAttributes });
  }

  // public updateUser(id: number, { name, email, password, active }): Promise<ResponseUser> {
  //
  // }
}

export default UsersService.instance;
