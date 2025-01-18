'use client'
import React from 'react'
import * as Ably from "ably"
import {AblyProvider, ChannelProvider} from 'ably/react'
import ChatRoom from '@/components/ui/ChatRoom'

const ChatProvider = () => {
    const client = new Ably.Realtime({authUrl:`${process.env.NEXT_PUBLIC_URL}/api`, logLevel:4})
  return (
    <AblyProvider client={client}>
        <ChannelProvider channelName='chatR'>
            <ChatRoom/>
        </ChannelProvider>
    </AblyProvider>
  )
}

export default ChatProvider
