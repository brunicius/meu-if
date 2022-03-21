import { Router } from 'express'
import { userController } from '../controllers/index'
import phoneRoute from './phone'
import User from '../base/User'
import IUser from '../interfaces/IUser'
import httpCodes from '../util/HttpCodes'

const router = Router()

router.get('/', (req, res)=>{                   // List users
    userController.getAll().then(userList=>{
        res.json(userList)
    })
})
router.get('/:id', (req, res)=>{                // Get user by id
    let id: number = parseInt(req.params.id)

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).json({
            error: "Invalid user id"
        })
    }

    let query = userController.getById(id)

    query.then(user=>{
        if (!user)
            return res.status(httpCodes.NOT_FOUND).json({
                error: "User not found"
            })
        res.json(user)
    })
})
router.post('/', async (req, res)=>{                    // Create new user
    let user = new User({
        ...req.body
    }, userController)

    if (!user.isValid())
        return res.status(httpCodes.BAD_REQUEST).json({
            error: "Invalid user"
        })



    return res.json(user)
})
router.put('/:id', (req, res)=>{                        // Update one user by id

})
router.delete('/:id', (req, res)=>{                     // Delete one user by id

})

router.use('/phone', phoneRoute)        // Phone route

export default router