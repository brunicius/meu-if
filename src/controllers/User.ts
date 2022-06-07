import { PrismaClient } from '@prisma/client'
import User from '../models/User';
import Database from '../database'
import EmailValidators from '../validators/email';
class UserController {
    private database: PrismaClient;

    constructor(database: PrismaClient) {
        this.database = database;
    }

    public async getAll(): Promise<User[]>{
        let userList: Array<User> = [];

        let recordList = await Database.user.findMany()

        for (let i in recordList) {
            userList.push(new User({
                ...recordList[i]
            }, this))
        }

        return userList;
    }
    public async getByLogin(userLogin: string): Promise<User> {
        if (!userLogin) {
            throw new Error("Invalid user login")
        }

        let record = await Database.user.findUnique({
            where: {
                login: userLogin
            }
        })

        if (!record)
            return null

        return new User({
            ...record
        }, this)
    }
    public async getByEmail(userEmail: string): Promise<User> {
        if (!userEmail || !EmailValidators.isValid(userEmail))
            throw new Error("Invalid email")

        let record = await Database.user.findUnique({
            where: {
                email: userEmail
            }
        })

        if (!record)
            return null

        return new User({
            ...record
        }, this)
    }
    public async getById(userId: number): Promise<User> {
        if (!userId)
            throw new Error("Invalid user id")

        let record = await Database.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!record)
            return null

        return new User({
            ...record
        }, this)
    }
    public async updateUser(userId: number, user: User): Promise<User> {
        if (!userId)
            throw new Error("Invalid user id")
        if (!user || !user.isValid())
            throw new Error("Invalid user")

        let updatedRecord = await this.database.user.update({
            where: {
                id: user.getId()
            },
            data: {
                ...user.getData(true)
            }
        })

        return new User({...updatedRecord})
    }
    public async createUser(user: User): Promise<User> {
        if (!user || !user.isValid())
            throw new Error("Invalid user")

        let createdRecord = await Database.user.create({
            data: {
                ...user.getData(true)
            }
        })

        return new User({
            ...createdRecord
        }, this)
    }
    public async deleteUserById(userId: number) {
        if (!userId)
            throw new Error("Invalid user id")

        let deletedUser = await Database.user.delete({
            where: {
                id: userId
            }
        })

        return new User({
            ...deletedUser
        })
    }
    public async userExists(userLogin?: string, userEmail?: string): Promise<boolean> {
        if (!userLogin && !userEmail)
            throw new Error("Email or login required.")

        let existentUser = await Database.user.findFirst({
            where: {
                OR: [
                    (userLogin ? {login: userLogin} : null),
                    (userEmail ? {email: userEmail} : null)
                ]
            }
        })

        if (existentUser)
            return true

        return false
    }
}

export default UserController