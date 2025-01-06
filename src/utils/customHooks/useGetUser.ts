import { DataQueryKeys } from "@/dataQueryKeys"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = (receiverUid: string) => {
    return useQuery({
        queryKey: [DataQueryKeys.USER],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-user/${receiverUid}`)
            const data = await response.json()
            return data
        }
    })
}