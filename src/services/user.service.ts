import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as Bluebird from 'bluebird';
import models from '../models';
import { UserAddModel, UserViewModel } from '../models/user';

const user = models.user;

export class UserService {
  public static get userAttributes() {
    return ['id', 'name', 'email', 'active'];
  }

  public static get user() {
    return UserService._user;
  }
  public static set user(u) {
    UserService._user = u;
  }

  private readonly _saltRounds = 12;
  private readonly _jwtSecret = '0.rfyj3n9nzh';
  private static _user: any;

  constructor() {}

  public register({ name, email, password }: UserAddModel): Promise<UserViewModel> {
    return bcrypt.hash(password, this._saltRounds).then((hash: string) => {
      return user.create({ name, email, password: hash }).then((u: any) => this.getUserById(u!.id));
    });
  }

  public login({ email }: UserAddModel) {
    return user.findOne({ where: { email } }).then((u: any) => {
      const { id, email } = u!;
      return { token: jwt.sign({ id, email }, this._jwtSecret, { expiresIn: 600 }) };
    })
  }

  public verifyToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this._jwtSecret, (errors: any, decoded: any) => {
        resolve(!(!!errors));
        if (!(!!errors)) {
          UserService.user = user.findByPk(decoded['id']);
        }
      })
    });
  }

  public getUserById(id: number): Bluebird<UserViewModel> {
    return user.findByPk(id, {
      attributes: UserService.userAttributes
    });
  }
}
