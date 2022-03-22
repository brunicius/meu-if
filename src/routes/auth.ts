import { Router }           from "express";
import { userController }   from "../controllers";
import httpCodes            from "../util/HttpCodes";
import bcrypt               from "bcrypt"
import jwt                  from "jsonwebtoken";
import IUserJwtPayload from "../interfaces/IUserJWTPayload";

const router = Router()

router.post('/login', (req, res)=>{
    let { login, password } = req.body

    if (!login || !password)
        return res.status(httpCodes.BAD_REQUEST).json({
            error: "Invalid user"
        })


    userController.getByLogin(login).then(user=>{
        let userData = user.getData(true)

        if (!bcrypt.compareSync(password, userData.password))
            return res.status(httpCodes.BAD_REQUEST).json({
                error: "Invalid user"
            })

        let userPayload: IUserJwtPayload = {
            id          : userData.id,
            firstName   : userData.firstName,
            lastName    : userData.lastName,
            username    : userData.login
        }


        let token =jwt.sign({ userPayload }, process.env.PRIVATE_KEY, { expiresIn: "5 days" })

        res.setHeader('authorization', `Bearer ${token}`)
        res.locals.jwt = token


        return res.json({
            user: user.getData(),
            token
        })
    })

})

export default router