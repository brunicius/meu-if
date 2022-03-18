import IUser from "../interfaces/UserInterface";
import PhoneServices from "../validators/phone";
class User {
    private id: Number;
    public login;
    public password;
    public email;
    public firstName;
    public lastName;
    public phoneNumber 
    private createdAt: Date;
    private updatedAt: Date;

    constructor(properties: IUser) {
        this.id             = properties.id;
        this.login          = properties.login;
        this.password       = properties.password;
        this.email          = properties.email;
        this.firstName      = properties.firstName;
        this.lastName       = properties.lastName;
        this.phoneNumber    = properties.phoneNumber;
        this.createdAt      = properties.createdAt;
        this.updatedAt      = properties.updatedAt;
    }

    isValid() {
        if(!PhoneServices.isValidPhone(this.phoneNumber))
            return false

        
    }
}

export default User