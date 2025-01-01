"use client";
import { ReceiverContext } from "@/app/page";
import { useContext, useEffect, useState } from "react";
import Message, { MessageInterface } from "../chat-room/Message";
import MessageInputContainer from "./MessageInputContainer";
import { useAuth } from "@/providers/AuthContext";

interface UserInterface {
  username: string;
  profileImage: string;
  email: string;
}

const demoData: MessageInterface[] = [
  {
    message: "Heyy . its been a while how are you ?",
    profileImage: "",
    timeStamp: "12:00PM",
    username: "Test",
    userType: "sender",
  },
  {
    message: "Heyy its good to finally hear from you dude ",
    profileImage: "",
    timeStamp: "12:10PM",
    username: "three",
    userType: "receiver",
  },
  {
    message: "Heyy . its been a while how are you ?",
    profileImage: "",
    timeStamp: "12:00PM",
    username: "Test",
    userType: "sender",
  },
  {
    message: "Heyy its good to finally hear from you dude ",
    profileImage: "",
    timeStamp: "12:10PM",
    username: "three",
    userType: "receiver",
  },
  {
    message: "Heyy . its been a while how are you ?",
    profileImage: "",
    timeStamp: "12:00PM",
    username: "Test",
    userType: "sender",
  },
  {
    message: "Heyy its good to finally hear from you dude ",
    profileImage: "",
    timeStamp: "12:10PM",
    username: "three",
    userType: "receiver",
  },
  {
    message: "Heyy . its been a while how are you ?",
    profileImage: "",
    timeStamp: "12:00PM",
    username: "Test",
    userType: "sender",
  },
  {
    message: "Heyy its good to finally hear from you dude ",
    profileImage: "",
    timeStamp: "12:10PM",
    username: "three",
    userType: "receiver",
  },
];

const ChatRoom = () => {
  const {user:sender} = useAuth() ?? {}
  const context = useContext(ReceiverContext);
  const [user, setUser] = useState<UserInterface>();
  const [message, setMessage] = useState("");

  if (!context) return;

  const { receiverUid } = context;

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-user/${receiverUid}`);
      const data = await response.json();
      setUser(data);
    };
    getUser();
  }, [receiverUid]);

  const renderUsername = (label: string) => <span className="text-text-dark capitalize text-xl font-medium">{label}</span>;
  const renderUserStatus = (status: string) => <span className="text-text-response font-medium text-lg">{status}</span>;
  const renderUserCard = () => {
    if (user)
      return (
        <div className="flex w-full p-5 gap-4 justify-between items-center border-b border-b-default-border-color">
          <div className="w-full max-w-[70px] ">
            <img src={user.profileImage} alt="" className="rounded-full object-cover w-[70px] h-[70px]" />
          </div>
          <div className="flex flex-col justify-center items-start w-full">
            {renderUsername(user.username)}
            {renderUserStatus("typing...")}
          </div>
        </div>
      );
  };

  return (
    <div className="flex flex-col justify-between w-full rounded-3xl bg-default">
      {receiverUid && (
        <>
          {renderUserCard()}
          <div className="flex overflow-auto no-scrollbar flex-1 flex-col">
            {demoData.map((data) => (
              <Message message={data.message} profileImage={data.profileImage} timeStamp={data.timeStamp} userType={data.userType} username={data.username} key={data.message} />
            ))}
          </div>
          <MessageInputContainer message={message} setMessage={setMessage} />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
