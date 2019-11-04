import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Promise } from 'bluebird';
import models from '../models';
import { RequestUserLogin, UserRegisterModel, UserLoginModel, ResponseLogin, UserUpdateModel } from '../types/user.types';
import Users from '../models/users';
import * as dotEnv from 'dotenv';
import CustomError from '../custom.error';

dotEnv.config();
const users: typeof Users = models.users as typeof Users;

class UsersService {
  public static get instance(): UsersService {
    return this._instance || (this._instance = new this(
      process.env.NODE_ENV as string,
      process.env.JWT_SECRET as jwt.Secret,
      process.env.SALT_ROUNDS as string | number
    ));
  }

  private static _instance: UsersService;

  public readonly userAttributes: Array<string>;

  private readonly _saltRounds: string | number = 4;
  private readonly _jwtSecret: jwt.Secret = 'easyString';

  constructor(nodeEnv: string, jwtSecret: jwt.Secret, saltRounds: string | number) {
    if (nodeEnv !== 'development') {
      this._jwtSecret = jwtSecret;
      this._saltRounds = Number(saltRounds);
    }
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

  public updateUser(id: number, { name, email, password, active }: UserUpdateModel): Promise<Users | null | undefined> {
    return this.getUserById(id).then((u: Users | null) => {
      return new Promise((resolve, reject) => {
        if (!!u) {
          resolve(users.update({ name, email, password, active }, { where: { id } }).then(() => this.getUserById(id)));
        } else {
          reject(new CustomError('Given ID not found', 404, 'userId', id, 'path'));
        }
      });
    });
  }
}

export default UsersService.instance;
