interface IUser {
    id: Number, 
    login: string, 
    password: string, 
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date
}

export default IUser;