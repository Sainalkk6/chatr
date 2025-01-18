import Ably from "ably"
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
    try {
        const client = new Ably.Rest(process.env.ABLY_API_KEY ?? "")
        const tokenRequestData = await client.auth.createTokenRequest({
            clientId: "chatR."
        })

        return NextResponse.json(tokenRequestData)
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error: (error as Error).message })
    }
}