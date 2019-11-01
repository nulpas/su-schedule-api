import { ApiError } from '../types/generic.types';
import CustomError from '../custom.error';

class CommonService {
  public static get instance(): CommonService {
    return this._instance || (this._instance = new this());
  }

  private static _instance: CommonService;

  constructor() {}

  public formatError(error: Array<ApiError> | CustomError | Error): ApiError | Array<ApiError> {
    if (Array.isArray(error)) {
      return error;
    }
    return {
      location: (error as CustomError).location ? (error as CustomError).location : '',
      msg:  error.message,
      param: (error as CustomError).param ? (error as CustomError).param : '',
      value: (error as CustomError).value ? (error as CustomError).value : ''
    };
  }
}

export default CommonService.instance;
