import { userController } from ".";
import User from "../models/User";

test('Test user controller', ()=>{
    let query = userController.createUser(new User({
        firstName: "Bruno",
        lastName: "Vinicius",
        login: "1045125",
        password: "amnsidmf",
        email: "mosdfmo@mafsdf.com"
    }))

    query.then(user=>{
        expect(user).toBe(typeof User)
    })
})