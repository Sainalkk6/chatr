import { useQuery } from "@tanstack/react-query";
import QueryKeys from "../../data-query-keys";
import { httpClientWithAuth } from "../../httpClient";
import API_URLS from "../../endpoints";

export const useGetChatRooms = () =>
  useQuery({
    queryKey: [QueryKeys.CHAT_ROOMS],
    queryFn: async () =>
      (await httpClientWithAuth.get(API_URLS.getChatRooms())).data,
  });
