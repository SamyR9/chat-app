import { Request, Response } from "express"
import prisma from "../db/prisma.js"
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body

    if(!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({error : 'Please fill all the fields'})
    }

    if(password != confirmPassword) {
      res.status(400).json({error:'Passwords don\'t match'})
    }

    const user = await prisma.user.findUnique({ where: {username}})

    if(user) {
      return res.status(400).json({error: 'User already exists'})
    }

    const salt = await bcryptjs.genSalt(10)

    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await prisma.user.create({
      data : {
        fullName,
        username,
        password : hashedPassword,
        gender
      }
    })

    if(newUser) {

      generateToken(newUser.id,res);

      return res.status(200).json({
        id : newUser.id,
        fullName: newUser.fullName,
        username : newUser.username
      })
    } else {
      return res.status(400).json({error : 'User could not be created due to incorrect data'})
    }
    
  } catch (error) {
    console.log('Error in auth controller', error)
    res.status(500).json({error : 'Internal server error'})
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {

    const { username, password } = req.body
    const user = await prisma.user.findUnique({where : {username}})

    if(!user) {
      return res.status(400).json({error : 'Invalid Username'})
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password)

    if(!isPasswordCorrect) {
      return res.status(400).json({error : 'Invalid Password'})
    }

    generateToken(user.id, res)

    return res.status(200).json({
      id : user.id,
      fullName : user.fullName,
      username : user.username
    })
    
  } catch (error) {
    return res.status(500).json({error : 'Please try again - issue in login'})
  }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.cookie("jwt", "", {maxAge : 0})
    res.status(200).json({message:'Logged out successfully'})
  } catch (error) {
    res.status(500).json({error:'Internal Server Error'})
  }
}

export const user = async(req: Request, res:Response):Promise<any> => {
  try {
    const user = await prisma.user.findUnique({where: {id:req.user.id}})
  } catch (error) {
    res.status(500).json({error:'Internal Server Error'})
  }
}