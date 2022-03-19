import IUser from "../interfaces/IUser";
import Database from '../database'
import EmailValidators from "../validators/email";
import * as bcrypt from 'bcrypt'
import UserController from "../controllers/User";
class User {
    private id          : number;
    public  login       : string;
    public  password    : string;
    public  email?       : string;
    public  firstName   : string;
    public  lastName    : string;
    private createdAt   : Date;
    private updatedAt   : Date;

    private controller?  : UserController;      // Opcional controller

    constructor(properties: IUser, controller?: UserController) {
        this.id             = properties.id
        this.login          = properties.login.trim();
        this.password       = properties.password.trim();
        this.email          = properties.email?.trim();
        this.firstName      = properties.firstName.trim();
        this.lastName       = properties.lastName.trim();
        this.createdAt      = properties.createdAt;
        this.updatedAt      = properties.updatedAt;
    }

    public getId(): number {
        return this.id
    }
    public isValid() {
        if (!this.login
            || !this.password
            || !this.email
            || !this.firstName
            || !this.lastName)
            return false

        if (this.login.includes(' '))
            return false

        if (this.email && !EmailValidators.isValid(this.email))
            return false

        return true
    }
    public getData() {
        return {
            id: this.id,
            login: this.login,
            password: this.password,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    public save() {
        if (!this.controller)
            throw new Error("Controller is not defined")

        this.controller.updateUser(this.id, this)
    }
}

Database.$use(async (params, next)=>{
    if (params.model == 'User' && (params.action == 'create' || params.action == 'update')) {
        if (params.args['data'].password)
            params.args.data.password = bcrypt.hashSync(params.args['data'].password, 10)
    }

    return next(params)
})

export default User