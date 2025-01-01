import React from "react";

interface MessageStripInterface {
  profileUrl: string;
  username: string;
  message: string;
  timestamp: string;
  status: "Delivered" | "Seen" | "Typing..." | "new message";
  onClick:()=> void
}

const MessageStrip = ({ profileUrl, message, username, status, timestamp,onClick }: MessageStripInterface) => {


  const statusColors = {
    Delivered: "text-field-label", // Green color
    Seen: "text-text-response", // Blue color
    "Typing...": "text-text-response", // Yellow color
    "new message": "text-new-message", // Red color
  };

  const renderMessageStatus = ({status}:{ status: "Delivered" | "Seen" | "Typing..." | "new message" })=>{
    return <span className={`${statusColors[status]} text-[20px] font-medium`}>{status}</span>
  } 
  

  const renderMessageCard = () => {
    return (
      <div className="flex items-center gap-4 ">
        <img src={profileUrl} alt="" className="object-cover w-[65px] h-[60px] rounded-full" />
        <div className="flex flex-col justify-center">
          <h5 className="text-text-dark text-sub-head-size font-medium">{username}</h5>
          <p className="line-clamp-1 text-field-label text-[18px] font-medium">{message}</p>
        </div>
      </div>
    );
  };

  const renderTime = () => {
    return (
      <div className="flex flex-col justify-center items-end gap-2">
        <h5 className="text-field-label text-nowrap text-[20px]">{timestamp}</h5>
        {renderMessageStatus({status})}
      </div>
    );
  };

  return (
    <div className="flex w-full max-w-[460px] py-5 justify-between items-center border-b border-[#efefef] bg-default cursor-pointer" onClick={onClick}>
      {renderMessageCard()}
      {renderTime()}
    </div>
  );
};

export default MessageStrip;
