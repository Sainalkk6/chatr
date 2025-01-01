"use client";
import { AUTH_TOKEN_KEY } from "@/constants";
import { clearItemFromCookie } from "@/utils/auth";
import { auth } from "@/utils/firebaseConfig";
import React from "react";

const Home = () => {
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
