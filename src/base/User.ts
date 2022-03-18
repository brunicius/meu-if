class User {
    private id: Number;
    public login: string;
    public password: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;    
    private createdAt: Date;
    private updatedAt: Date;

    constructor(
        id: Number, 
        login: string, 
        password: string, 
        email: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        createdAt: Date,
        updatedAt: Date
        ) {
            this.id = id;
            this.login = login;
            this.password = password;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phoneNumber = phoneNumber;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt
        }
}

export default User