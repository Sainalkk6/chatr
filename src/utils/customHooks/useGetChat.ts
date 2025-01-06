import { DataQueryKeys } from "@/dataQueryKeys"
import { useQuery } from "@tanstack/react-query"

interface ChatroomResponseInterface {
  id:string;
  messages:{
    senderId:string;
    receiverId:string;
    timestamp:string;
    message:string
  }[]
  participants:[string,string]
}

export const useGetChat = (senderId: string, receiverId: string) => {
    return useQuery({
        queryKey: [DataQueryKeys.CHAT_ROOM],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/chat/get-chats?senderId=${senderId}&receiverId=${receiverId}`)
            const data:ChatroomResponseInterface = await response.json()
            return data
        },
    })
}