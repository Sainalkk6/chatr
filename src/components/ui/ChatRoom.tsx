"use client";
import { ReceiverContext } from "@/app/page";
import { DataQueryKeys } from "@/dataQueryKeys";
import { useAuth } from "@/providers/AuthContext";
import { useGetChat } from "@/utils/customHooks/useGetChat";
import { useSendText } from "@/utils/customHooks/useSendText";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import MessageInputContainer from "./MessageInputContainer";
import Message from "../chat-room/Message";
import Loader from "./Loader";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface UserInterface {
  username: string;
  profileImage: string;
  email: string;
}

const ChatRoom = () => {
  const { user } = useAuth() ?? {};
  const context = useContext(ReceiverContext);
  const [receiver, setReciever] = useState<UserInterface>();
  const [sender, setSender] = useState<UserInterface>();
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();
  console.log(user)

  if (!context) return;

  const { receiverUid } = context;

  if (receiverUid) queryClient.invalidateQueries({ queryKey: [DataQueryKeys.CHAT_ROOM] });

  const { mutate: sendMessage } = useSendText();

  const { data } = useGetChat(user?.uid ?? "", receiverUid);

  useEffect(() => {
    const getReceiver = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-user/${receiverUid}`);
      const data = await response.json();
      setReciever(data);
    };
    const getSender = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-user/${user?.uid}`);
      const data = await response.json();
      setSender(data);
    };
    getSender();
    getReceiver();
  }, [receiverUid]);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [data]);

  const handleSendMessage = () => {
    sendMessage({
      message: message,
      senderId: (user && user.uid) ?? "",
      receiverId: receiverUid,
    });
  };

  const renderMessages = () => {
    if (!data?.messages) {
      return (
        <div className="flex items-center relative justify-center w-full">
          <span className="text-xl font-medium absolute text-center top-[300px]">
            No messages yet. <br /> Be the first one to say hi !
          </span>
        </div>
      );
    }

    return data.messages.map((message) => {
      const isSender = user?.uid === message.senderId;
      const userType: "sender" | "receiver" = isSender ? "sender" : "receiver";
      const profile = isSender ? sender?.profileImage : receiver?.profileImage;
      const username = isSender ? sender?.username : receiver?.username;
      const formattedTime = dayjs(message.timestamp).format("h:mm:ss A");

      return <Message key={message.timestamp} message={message.message} profileImage={profile!} timeStamp={formattedTime} userType={userType} username={username!} />;
    });
  };

  const renderUsername = (label: string) => <span className="text-text-dark capitalize text-xl font-medium">{label}</span>;
  const renderUserStatus = (status: string) => <span className="text-text-response font-medium text-lg">{status}</span>;
  const renderUserCard = () => {
    if (receiver)
      return (
        <div className="flex w-full p-5 gap-4 justify-between items-center border-b border-b-default-border-color">
          <div className="w-full max-w-[70px] ">
            <img src={receiver.profileImage} alt="" className="rounded-full object-cover w-[70px] h-[70px]" />
          </div>
          <div className="flex flex-col justify-center items-start w-full">
            {renderUsername(receiver.username)}
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
          <div className="flex overflow-auto no-scrollbar flex-1 flex-col" ref={containerRef}>
            {renderMessages()}
          </div>
          <MessageInputContainer handleClick={handleSendMessage} message={message} setMessage={setMessage} />
        </>
      )}
    </div>
  );
};

export default ChatRoom;
