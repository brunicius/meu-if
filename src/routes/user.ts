import { Router } from 'express'
import Database from '../database'

const router = Router()

router.get('/', (req, res)=>{
    Database.user.create({
        data: {
            email: `${Math.random()}@gmail.com`,
            firstName: "Bruno",
            lastName: "Vinicius",
            login: "12345",
            password: "1234",
            phoneNumber: "5587981615939",            
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