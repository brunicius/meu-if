import { PrismaClient } from "@prisma/client";
import Phone from "../models/Phone";

class PhoneController {
    private database: PrismaClient;

    constructor(database: PrismaClient) {
        this.database = database
    }

    public async getAll(): Promise<Phone[]> {
        let records                 = await this.database.phone.findMany()
        let phoneList: Array<Phone> = []

        for(let i in records) {
            let record = records[i]

            phoneList.push(new Phone({
                ...record
            }))
        }

        return phoneList
    }
}

export default PhoneController