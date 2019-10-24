import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Promise } from 'bluebird';
import models from '../models';
import { RequestUserLogin, UserRegisterModel, ResponseUser, UserLoginModel, ResponseLogin } from '../types/user.types';

const user = models.user;

class UserService {
  public static get instance(): UserService {
    return this._instance || (this._instance = new this());
  }

  private static _instance: UserService;

  public readonly userAttributes: Array<string>;

  private readonly _saltRounds = 12;
  private readonly _jwtSecret = '0.rfyj3n9nzh';

  constructor() {
    this.userAttributes = ['id', 'name', 'email', 'active'];
  }

  public register({ name, email, password }: UserRegisterModel): Promise<ResponseUser> {
    return bcrypt.hash(password, this._saltRounds).then((hash: string) => {
      return user.create({ name, email, password: hash }).then((u: any) => this.getUserById(u.id));
    });
  }

  public login({ email }: UserLoginModel): Promise<ResponseLogin> {
    return user.findOne({ where: { email } }).then((u: any) => {
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

  public getUserById(id: number): Promise<ResponseUser> {
    return user.findByPk(id, { attributes: this.userAttributes });
  }

  // public updateUser(id: number, { name, email, password, active }): Promise<ResponseUser> {
  //
  // }
}

export default UserService.instance;
