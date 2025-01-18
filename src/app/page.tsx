"use client";
import Aside from "@/components/ui/Aside";
import ChatRoom from "@/components/ui/ChatRoom";
import { useAuth } from "@/providers/AuthContext";
import ChatProvider from "@/providers/ChatProvider";
import { usePresence } from "@/utils/customHooks/usePresence";
import { auth } from "@/utils/firebaseConfig";
import { createContext, useEffect, useState } from "react";

interface ReceiverContextType {
  receiverUid: string;
  setreceiverUid: React.Dispatch<React.SetStateAction<string>>;
}

export const ReceiverContext = createContext<ReceiverContextType | null>(null);

const handleSignOut = async () => {
  await auth.signOut();
   window.location.reload();
};

const Home = () => {
  const [receiverUid, setreceiverUid] = useState("");
  const {user } = useAuth() ?? {}

  usePresence(user?.uid ?? "")
  return (
    <ReceiverContext.Provider value={{ receiverUid, setreceiverUid }}>
      <div className="flex w-full p-5 bg-[#f9f8fd] h-screen gap-5">
        <Aside />
        <div className="flex w-full">
          <ChatProvider/>
          {/* Todo : Remove this button from here */}
          <button onClick={handleSignOut}>Logout</button>
        </div>
      </div>
    </ReceiverContext.Provider>
  );
};

export default Home;
