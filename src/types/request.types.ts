export interface RequestUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RequestUserLogin {
  id: number;
  email: string;
}
