import { userController } from ".";

test('Test user controller', ()=>{
    let user = userController.getById(0)

    console.log(user);

})