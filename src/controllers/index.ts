import UserController from "./User";
import Database from "../database";
import PhoneController from "./Phone";

const userController = new UserController(Database);
const phoneController = new PhoneController(Database);

export { userController, phoneController };
