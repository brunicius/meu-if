import { Router } from 'express'
import { userController } from '../controllers'
import httpCodes from '../util/HttpCodes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import IUserJwtPayload from '../interfaces/IUserJwtPayload'
import EmailValidators from '../validators/email'
import NameValidators from '../validators/name'
import LoginValidators from '../validators/login'
import User from '../models/User'

const router = Router()

router.post('/login', (req, res) => {
  let { login, password } = req.body

  if (!login || !password)
    return res.status(httpCodes.BAD_REQUEST).json({
      error: 'Invalid user',
    })

  userController.getByLogin(login).then((user) => {
    let userData = user.getData(true)

    if (!bcrypt.compareSync(password, userData.password))
      return res.status(httpCodes.BAD_REQUEST).json({
        error: 'Invalid user',
      })

    let userPayload: IUserJwtPayload = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.login,
    }

    let token = jwt.sign({ userPayload }, process.env.PRIVATE_KEY, {
      expiresIn: '5 days',
    })

    res.setHeader('authorization', `Bearer ${token}`)
    res.locals.jwt = token

    return res.json({
      user: user.getData(),
      token,
    })
  })
})

router.post('/register', (req, res) => {
  let { firstName, lastName, email, login, password } = req.body

  if (!NameValidators.isValid(firstName) || !NameValidators.isValid(lastName))
    return res.status(httpCodes.BAD_REQUEST).json({
      error: 'Invalid user names.',
    })

  if (!EmailValidators.isValid(email))
    return res.status(httpCodes.BAD_REQUEST).json({
      error: 'Invalid user email.',
    })

  if (!LoginValidators.isValid(login)) {
    return res.status(httpCodes.BAD_REQUEST).json({
      error: 'Invalid user login.',
    })
  }

  if (!password) {
    return res.status(httpCodes.BAD_REQUEST).json({
      error: 'Missing user password.',
    })
  }

  let newUser = new User(
    {
      firstName,
      lastName,
      email,
      login,
      password,
    },
    userController
  )

  userController.userExists(login, email).then((exists) => {
    if (exists)
      return res.status(httpCodes.BAD_REQUEST).json({
        error: 'User login or email already exists',
      })

    newUser
      .create()
      .then((createdUser) => {
        return res.json({
          message: 'Success',
          user: createdUser.getData(),
        })
      })
      .catch((err) => {
        console.error(err)
        return res.status(httpCodes.INTERNAL_ERROR).json({
          error: 'Internal error',
        })
      })
  })
})

export default router
