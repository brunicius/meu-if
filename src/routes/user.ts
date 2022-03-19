import { Router } from 'express'
import { userController } from '../controllers/index'
import phoneRoute from './phone'
import User from '../base/User'
import IUser from '../interfaces/IUser'
import httpCodes from '../util/HttpCodes'

const router = Router()

router.get('/', (req, res)=>{
    userController.getAll().then(userList=>{
        res.json(userList)
    })
})
router.get('/:id', (req, res)=>{
    let id: number = parseInt(req.params.id)

    let user = userController.getById(id)

    if (!user)
        return res.status(httpCodes.NOT_FOUND).json({
            error: "User not found"
        })

    user.then(user=>{
        res.json(user)
    })
})
router.post('/', async (req, res)=>{
    let user = new User({
        ...req.body
    })

    if (!user.isValid())
        return res.status(httpCodes.BAD_REQUEST).json({
            error: "Invalid user"
        })

    console.log(user);
    return res.json(user)
})
router.put('/:id', (req, res)=>{

})
router.delete('/:id', (req, res)=>{

})

router.use('/phone', phoneRoute)        // Phone route

export default router