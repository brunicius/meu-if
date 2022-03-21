import { PrismaClient } from '@prisma/client'
import User from '../base/User';
import Database from '../database'
import IUser from '../interfaces/IUser';
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
            }))
        }

        return userList;
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

        let user = new User({
            ...record
        })
        return user
    }
    public updateUser(userId: number, user: User) {
        if (!userId)
            throw new Error("Invalid user id")
        if (!user || !user.isValid())
            throw new Error("Invalid user")

        return Database.user.update({
            where: {
                id: userId
            },
            data: {
                ...user.getData()
            }
        })
    }
    public createUser(properties: IUser) {
        let user = new User(properties)

        if (!user || !user.isValid())
            throw new Error("Invalid user")

        return Database.user.create({
            data: {
                ...user.getData()
            }
        })
    }
}

export default UserController