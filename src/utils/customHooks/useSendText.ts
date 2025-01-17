import { DataQueryKeys } from "@/dataQueryKeys"
import { MessageInterface } from "@/types/message"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSendText = (receiverId:string)=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data:MessageInterface) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/chat/send-chat`,{
                method: 'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            })
            const res = await response.json()
            return res
        },
        onSuccess: ()=> queryClient.invalidateQueries({queryKey:[DataQueryKeys.CHAT_ROOM]})
    })
}