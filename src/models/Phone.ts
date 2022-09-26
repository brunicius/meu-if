import PhoneController from "../controllers/Phone";
import IPhone from "../interfaces/IPhone";
import PhoneValidators from "../validators/phone";

class Phone {
  private id?: number;
  public number: string;
  public userId: Number;
  public active: Boolean = false;
  public createdAt?: Date;
  public updatedAt?: Date;

  private controller?: PhoneController;

  constructor(properties: IPhone, controller?: PhoneController) {
    this.id = properties.id;
    this.number = properties.number?.trim();
    this.userId = properties.userId;
    this.active = properties.active || false;
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;

    this.controller = controller;
  }

  isValid(): boolean {
    if (!this.number || !this.userId) return false;

    if (!PhoneValidators.isValidPhone(this.number)) return false;

    return true;
  }
  public getId(): number {
    return this.id;
  }
  public getData(): IPhone {
    let data = {
      id: this.id,
      number: this.number,
      userId: this.userId,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return data;
  }
  public setData(properties: IPhone) {
    this.id = properties.id || this.id;
    this.number = properties.number || this.number;
    this.userId = properties.userId || this.userId;
    this.active = properties.active || this.active;
    this.createdAt = properties.createdAt || this.createdAt;
    this.updatedAt = properties.updatedAt || this.updatedAt;
  }
  public async create(): Promise<Phone> {
    throw new Error("Not implemented");
  }
  public async save(): Promise<Phone> {
    throw new Error("Not implemented");
  }
  public async delete(): Promise<Phone> {
    throw new Error("Not implemented");
  }
}

export default Phone;
