import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { prisma } from '../app'
import * as jwt from '../middleware/jwt'
/**
 * GET /
 * Home page.
 */
type userBody = {
  username: string
  password: string
  role: string
}
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body
  let result = await prisma.user.findUnique({
    where: { username: username },
    select: {
      username: true,
      password: true,
      role: true
    }
  })
  if (result != null) {
    if (bcrypt.compareSync(password, result.password)) {
      const payload = { username: result.username, role: result.role }
      const token = jwt.sign(payload)
      res.json({
        result: 'ok',
        token,
        username,
        role: payload.role,
        message: JSON.stringify(result)
      })
    } else {
      res.json({ result: 'not ok', message: 'Incorrect password' })
    }
  } else {
    res.json({ result: 'not ok', message: 'Incorrect username' })
  }
}

// Register
export const register = async (req: Request, res: Response) => {
  try {
    console.log(JSON.stringify(req.body))
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let result = await prisma.user.create({ data: req.body })
    res.json({ result: 'ok', message: JSON.stringify(result) })
  } catch (e) {
    // res.json({ result: "not ok", message: JSON.stringify(error) });
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log('There is a unique constraint violation, a new user cannot be created with this email')
      }
    }
    throw e
  }
}

function decodeJwt(token: String) {
  var base64Payload = token.split('.')[1]
  var payloadBuffer = Buffer.from(base64Payload, 'base64')
  return JSON.parse(payloadBuffer.toString())
}

export const profile = async (req: Request, res: Response) => {
  const header = req.header('Authorization')
  if (header) {
    const accessToken = header.replace('Bearer', '')
    const payload = decodeJwt(accessToken)
    console.log(payload)

    // const payload = { username, role }
    // const token = jwt.sign(payload)
    res.json({
      result: 'ok',
      user: {
        token: accessToken,
        username: payload.username,
        role: payload.role
      }
    })
  }
}
// Query all users
export const user = async (req: Request, res: Response) => {
  let result = await prisma.user.findMany()
  res.json(result)
}

// Delete users
export const deleteUser = async (req: Request, res: Response) => {
  let result = await prisma.user.delete({
    where: {
      username: req.body.username
    }
  })
  res.json(result)
}
