import UserController from "./User";
import Database from '../database'

const userController = new UserController(Database)     

export {
    userController
}