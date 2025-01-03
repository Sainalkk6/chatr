"use client";
import Aside from "@/components/ui/Aside";
import ChatRoom from "@/components/ui/ChatRoom";
import { auth } from "@/utils/firebaseConfig";
import { createContext, useState } from "react";

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
  return (
    <ReceiverContext.Provider value={{ receiverUid, setreceiverUid }}>
      <div className="flex w-full p-5 bg-[#f9f8fd] h-screen gap-5">
        <Aside />
        <div className="flex w-full">
          <ChatRoom/>
          {/* Todo : Remove this button from here */}
          <button onClick={handleSignOut}>Logout</button>
        </div>
      </div>
    </ReceiverContext.Provider>
  );
};

export default Home;
