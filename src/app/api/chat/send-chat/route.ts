import { connect } from "@/lib/connectDB";
import { Chatroom } from "@/models/chatroom";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connect()
        const data = await req.json()
        const existingChatRoom = await Chatroom.findOne({
            participants: {
                $all: [data.senderId, data.receiverId]
            }
        }
        )
        if (existingChatRoom) {
            try {
                existingChatRoom.messages.push({
                    message: data.message,
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    timestamp: new Date().toISOString()
                })
                await existingChatRoom.save()
                return NextResponse.json({ message: "Successfully updated the existing message" })
            } catch (error) {
                return NextResponse.json({ message: "Something went wrong", error })
            }

        } else {
            await Chatroom.create({
                participants: [data.senderId, data.receiverId],
                messages: {
                    message: data.message,
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    timestamp: new Date().toISOString()
                }
            })

            return NextResponse.json({ message: "Successfully created a new chat room" })
        }

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while sending the message", error })
    }
}