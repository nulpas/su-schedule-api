export default class CustomError extends Error {
  public param: string;
  public value: string | number | boolean;
  public location: string;

  constructor(...args) {
    super(args[0]);

    this.param = (args[1]) ? args[1] : undefined;
    this.value = (args[2]) ? args[2] : undefined;
    this.location = (args[3]) ? args[3] : undefined;
  }
}
