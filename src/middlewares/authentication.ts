import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import IUserJwtPayload from '../interfaces/IUserJWTPayload'
import httpCodes from '../util/HttpCodes'

const auth = (req: Request, res: Response, next: NextFunction) => {
    let authorization = req.headers.authorization


    if (!authorization) {
        return res.status(httpCodes.BAD_REQUEST).json({
            error: "Invalid token"
        })
    }

    if (!/^(Bearer )([a-zA-Z0-9.]+)$/gm.test(authorization)) {
        return res.status(httpCodes.BAD_REQUEST).json({
            error: "Invalid token"
        })
    }

    let token = /([a-zA-Z0-9.]+)$/.exec(authorization)[0]

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded: IUserJwtPayload)=>{
        if (err)
            return res.status(httpCodes.BAD_REQUEST).json({
                error: "Invalid token"
            })

        res.locals.user = decoded
        next()
    })
}


export default auth