import {Router} from 'express'
import httpCodes from '../util/HttpCodes'
import { isValidPhone, formatPhone } from '../validators/phone'
import { app } from '../app'

/*
    Routes import
 */
import userRoute from './user'


const router = Router()

router.get('/', (req, res)=>{
    return res.json({
        success: true,
        time: new Date()
    })
})
router.use('/user', userRoute)

export default router