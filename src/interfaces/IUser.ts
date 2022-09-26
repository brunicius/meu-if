interface IUser {
  id?: number;
  login: string;
  password: string;
  email?: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser;
