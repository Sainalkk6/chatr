import React from "react";

interface MessageStripInterface {
  profileUrl: string;
  username: string;
  message: string;
  timestamp: string;
  status: string;
}

const MessageStrip = ({ profileUrl, message, username, status, timestamp }: MessageStripInterface) => {
  const renderMessageCard = () => {
    return (
      <div className="flex items-center gap-4 ">
        <img src={profileUrl} alt="" className="object-cover w-[70px] h-[70px] rounded-full" />
        <div className="flex flex-col justify-center">
          <h5 className="text-text-dark text-sub-head-size font-medium">{username}</h5>
          <p className="line-clamp-1 text-field-label text-[18px] font-medium">{message}</p>
        </div>
      </div>
    );
  };

  const renderTime = () => {
    return (
      <div className="flex flex-col justify-center gap-2">
        <h5 className="text-field-label text-[20px]">{timestamp}</h5>
        <span className="text-field-label text-[20px] font-medium">{status}</span>
      </div>
    );
  };

  return (
    <div className="flex w-full max-w-[460px] py-5 justify-between items-center border border-[#efefef] bg-default">
      {renderMessageCard()}
      {renderTime()}
    </div>
  );
};

export default MessageStrip;
