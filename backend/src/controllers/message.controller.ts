import { Request, Response } from "express" 
import prisma from "../db/prisma.js"

export const sendMessage = async(req: Request, res:Response): Promise<any> => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user.id

    let conversation = await prisma.conversation.findFirst({where : {
      participantIds: { 
        hasEvery: [senderId, receiverId] 
      },
    }})

    if(!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId]
          }
        }
      })
    }

    const newMessage = await prisma.message.create({
      data : {
        senderId,
        body : message,
        conversationId : conversation.id
      }
    })

    if(newMessage) {
      conversation = await prisma.conversation.update({
        where : {
          id : conversation.id
        },
        data : {
          messages: {
            connect : {
              id : newMessage.id
            }
          }
        }
      })
    }

    res.status(201).json(newMessage)

  } catch (error) {
    res.status(500).json({error:'Internal server error'})
  }
}

export const getMessages = async( req: Request, res: Response): Promise<any> => {
  try {
    const {id: userToChatId} = req.params
    const senderId = req.user.id

    const conversation = await prisma.conversation.findFirst({
      where : {
        participantIds: {
          hasEvery : [senderId, userToChatId]
        }
      },
      include: {
        messages : {
          orderBy : {
            createdAt : "asc"
          }
        }
      }
    })

    if(!conversation) {
      return res.status(200).json(null)
    }

    res.status(200).json(conversation)

  } catch (error) {
    res.status(500).json({error:'Internal server error'})
  }
}

export const getUsersForSidebar = async (req: Request, res: Response): Promise<any> => {
  try {
    const authUserId = req.user.id
    const users = await prisma.user.findMany({
      where : {
        id : {
          not: authUserId
        }
      },
      select : {
        id : true,
        fullName: true,
      }
    })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({error:'Internal server error'})
  }
}