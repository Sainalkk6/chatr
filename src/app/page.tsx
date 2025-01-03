"use client";
import { AUTH_TOKEN_KEY } from "@/constants";
import QueryKeys from "@/utils/api/data-query-keys";
import { useGetUsers } from "@/utils/api/hooks/users/useGetUsers";
import { httpClientWithAuth } from "@/utils/api/httpClient";
import { clearItemFromCookie } from "@/utils/auth";
import { auth } from "@/utils/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Home = () => {
  // const { data } = useQuery({
  //   queryFn: async () => {
  //     console.log("inside here..............................");
  //     const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`);
  //     return data;
  //   },
  //   queryKey: [QueryKeys.USERS],
  // });

  const { data } = useGetUsers();

  console.log(3534535, data);

  async function handleLogout() {
    await auth.signOut();
    clearItemFromCookie(AUTH_TOKEN_KEY);
    window.location.reload();
  }

  return (
    <div>
      Home
      <br />
      <span className="text-xl font-bold">
        Hello, <span className="text-2xl">{auth.currentUser?.email}</span>
      </span>
      <br />
      <button
        className="bg-slate-300 px-3 py-2 rounded-md mx-4 my-2 uppercase font-semibold hover:bg-slate-400"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
