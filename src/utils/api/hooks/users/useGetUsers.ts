import QueryKeys from "@/utils/api/data-query-keys";
import { useQuery } from "@tanstack/react-query";
import { httpClientWithAuth } from "../../httpClient";
import API_URLS from "../../endpoints";

export const useGetUsers = () => {
  console.log(23423423423432);
  return useQuery({
    queryKey: [`${QueryKeys.USERS}`],
    queryFn: async () => {
      console.log("inside here..............................");
      const data = (await httpClientWithAuth.get(API_URLS.getUsers())).data;
      return data;
    },
  });
};
