import mongoose from "mongoose"
import { NextResponse } from "next/server"

const DATABASE_URL = process.env.MONGODB_URI

export const connect = async()=>{
    try{
        await mongoose.connect(DATABASE_URL!)
    } catch(error){ 
        return NextResponse.json({message:"Something went wrong while connecting to the database",error})
    }
}