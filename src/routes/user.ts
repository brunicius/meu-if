import { Router } from 'express'
import Database from '../database'

const router = Router()

router.get('/', (req, res)=>{
    Database.user.create({
        data: {
            email: `${Math.random()}@gmail.com`,
            firstName: "Bruno",
            lastName: "Vinicius",
        }
    }).then(user=>{
        res.json(user)
    })
})

router.get('/list', (req, res)=>{
    Database.user.findMany().then(data=>{
        res.json(data)
    })
})

export default router