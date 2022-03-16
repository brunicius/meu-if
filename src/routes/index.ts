import {Router} from 'express'
import { app } from '../app'

const router = Router()


router.get('/', (req, res)=>{
    app.messenger.sendMessage('558781615939@c.us', 'test')

    return res.json({
        success: true
    })
})

export default router