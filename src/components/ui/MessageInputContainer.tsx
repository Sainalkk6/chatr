"use client";
import React, { SetStateAction, useState } from "react";

interface MessageInputContainerInterface {
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  handleClick: () => void;
}

const MessageInputContainer = ({ message, handleClick, setMessage }: MessageInputContainerInterface) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);
  const disabled = message.length > 0

  return (
    <div className="flex w-full gap-2 items-center p-4 rounded-3xl">
      <input type="text" onChange={handleChange} value={message} placeholder="Type a message..." className="py-1 px-5 h-16 items-center w-full  rounded-full border border-[#bcbcbc] outline-none text-text-dark font-medium text-xl" />
      <button disabled= {!disabled} onClick={()=>{
        handleClick()
        setMessage("")
        }} className="flex items-center justify-center py-3 px-[10px]  text-white rounded-full bg-new-message cursor-pointer disabled:cursor-not-allowed disabled:opacity-80">
        <img src="/icons/send-icon.svg" alt="" />
      </button>
    </div>
  );
};

export default MessageInputContainer;
