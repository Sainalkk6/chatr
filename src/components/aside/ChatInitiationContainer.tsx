"use client";
import { ReceiverContext } from "@/app/page";
import { useAuth } from "@/providers/AuthContext";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { TbMessageCircle } from "react-icons/tb";
import CategorySelector from "../ui/CategorySelector";
import MessageStrip from "../ui/MessageStrip";

interface UserInterface {
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  phone: string;
  username: string;
  userId:string;
}

const ChatIntitationContainer = () => {
  const context = useContext(ReceiverContext);
  const {user} = useAuth() ?? {}
  if (!context) {
    throw new Error("Didnt receive the context properly");
  }
  const { setreceiverUid, receiverUid } = context;
  const time = Date.now();
  const formattedTime = dayjs(time).format("h:mm A");
  const [users, setUsers] = useState<UserInterface[]>();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-users/${receiverUid}`);
      const users = await response.json();
      setUsers(users);
    };
    getUsers();
  }, []);

  const handleClick = (email: string) => setreceiverUid(email);

  const renderMessageHeader = () => {
    return (
      <div className="flex py-4 justify-between items-center">
        <span className="text-field-label text-xl font-medium">Messages</span>
        <img src="/icons/message-icon.svg" alt="" />
      </div>
    );
  };

  const otherUsers = users && users.filter((other)=> other.userId !== user?.uid)

  return (
    <div className="flex flex-col h-fit overflow-auto no-scrollbar">
      <CategorySelector />
      {renderMessageHeader()}
      <div className="overflow-y-auto no-scrollbar">
        {otherUsers && otherUsers.map((user) => <MessageStrip onClick={() => handleClick(user.userId)} message="Weather Looks very good today" profileUrl={user.profileImage} status="Seen" timestamp={formattedTime} username={user.username} key={user.email} />)}
        </div>
    </div>
  );
};

export default ChatIntitationContainer;
