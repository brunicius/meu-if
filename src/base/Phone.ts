import IPhone from "../interfaces/IPhone";
import PhoneValidators from "../validators/phone";

class Phone {
    private id?         : number;
    public  number      : string;
    public  userId?     : Number;
    public  active      : Boolean = false;
    public  createdAt?  : Date;
    public  updatedAt?  : Date;

    //private controller? : PhoneController;

    constructor(properties: IPhone) {
        this.id         = properties.id;
        this.number     = properties.number.trim();
        this.userId     = properties.userId;
        this.active     = properties.active;
        this.createdAt  = properties.createdAt;
        this.updatedAt  = properties.updatedAt;
    }

    isValid(): boolean {
        if (!PhoneValidators.isValidPhone(this.number))
            return false

        return true
    }
}

export default Phone
