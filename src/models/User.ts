import IUser from "../interfaces/IUser";
import Database from "../database";
import EmailValidators from "../validators/email";
import * as bcrypt from "bcrypt";
import UserController from "../controllers/User";
class User {
  private id: number;
  public login: string;
  public password: string;
  public email?: string;
  public firstName: string;
  public lastName: string;
  private createdAt: Date;
  private updatedAt: Date;

  private controller?: UserController; // Opcional controller

  constructor(properties: IUser, controller?: UserController) {
    this.id = properties.id;
    this.login = properties.login?.trim();
    this.password = properties.password?.trim();
    this.email = properties.email?.trim();
    this.firstName = properties.firstName?.trim();
    this.lastName = properties.lastName?.trim();
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;

    this.controller = controller; // Model controller
  }

  public isValid() {
    if (!this.login || !this.password || !this.firstName || !this.lastName)
      return false;

    if (this.login.includes(" ")) return false;

    if (this.email && !EmailValidators.isValid(this.email)) return false;

    return true;
  }
  public getId(): number {
    return this.id;
  }
  public getData(includePassword: boolean = false) {
    let result = {
      id: this.id,
      login: this.login,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    if (!includePassword) {
      delete result.password;
    }
    return result;
  }
  public setData(properties: IUser) {
    properties.login ? (this.login = properties.login.trim()) : undefined;
    properties.password
      ? (this.password = properties.password.trim())
      : undefined;
    properties.email ? (this.email = properties.email.trim()) : undefined;
    properties.firstName
      ? (this.firstName = properties.firstName.trim())
      : undefined;
    properties.lastName
      ? (this.lastName = properties.lastName.trim())
      : undefined;
  }
  public async create(): Promise<User> {
    if (!this.controller) throw new Error("Controller is not defined");

    return await this.controller.createUser(this);
  }
  public async save(): Promise<User> {
    if (!this.controller) throw new Error("Controller is not defined");

    return this.controller.updateUser(this.getId(), this);
  }
  public async delete(): Promise<User> {
    if (!this.controller) throw new Error("Controller is not defined");

    return await this.controller.deleteUserById(this.getId());
  }
}

Database.$use(async (params, next) => {
  if (
    params.model == "User" &&
    (params.action == "create" || params.action == "update")
  ) {
    if (params.args["data"].password) {
      params.args.data.password = bcrypt.hashSync(
        params.args["data"].password,
        10
      );
    }

    if (params.args["data"].updatedAt || params.args["data"].updatedAt) {
      params.args.data.updatedAt = undefined;
      params.args.data.createdAt = undefined;
    }
  }

  return next(params);
});

export default User;
