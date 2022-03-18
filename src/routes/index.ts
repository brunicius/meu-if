import {Router} from 'express'
import httpCodes from '../util/HttpCodes'
import { isValidPhone, formatPhone } from '../validators/phone'
import { app } from '../app'

const router = Router()


router.get('/', (req, res)=>{
    return res.json({
        success: true
    })
})
router.get('/test', (req, res)=>{
    let phoneNumber = req.query.phone?.toString().trim(),
        message     = req.query.message?.toString().trim()

    if (!phoneNumber || !message)
        return res.status(httpCodes.BAD_REQUEST).json({
            error: 'Insufficient data'
        })

    if (!isValidPhone(phoneNumber))
        return res.status(httpCodes.BAD_REQUEST).json({
            error: 'Invalid phone number'
        })

    let formattedPhoneNumber = formatPhone(phoneNumber)

    app.messenger.sendMessage(formattedPhoneNumber, message)

    return res.status(httpCodes.SUCCESS).json({
        message: "Message sended"
    })
})

export default router