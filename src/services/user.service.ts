import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as Bluebird from 'Bluebird';
import models from '../models';
import { UserAddModel, UserViewModel } from '../models/user';
const User = models.User;

export class UserService {
  public static get userAttributes() {
    return ['id', 'email'];
  }

  public static get user() {
    return UserService._user;
  }
  public static set user(u) {
    UserService._user = u;
  }

  private readonly _saltRounds = 12;
  private readonly _jwtSecret = '0.rfyj3n9nzh';
  private static _user;

  constructor() {}

  public register({ email, password }: UserAddModel) {
    return bcrypt.hash(password, this._saltRounds)
      .then((hash: string) => {
        return User.create({ email, password: hash })
          .then(u => this.getUserById(u!.id));
      });
  }

  public login({ email }: UserAddModel) {
    return User.findOne({ where: { email } }).then(u => {
      const { id, email } = u!;
      return {
        token: jwt.sign({ id, email }, this._jwtSecret)
      };
    })
  }

  public verifyToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this._jwtSecret, (errors, decoded) => {
        resolve(!(!!errors));
        if (!(!!errors)) {
          UserService.user = User.findByPk(decoded['id']);
        }
      })
    });
  }

  public getUserById(id: number): Bluebird<UserViewModel> {
    return User.findByPk(id, {
      attributes: UserService.userAttributes
    });
  }
}
