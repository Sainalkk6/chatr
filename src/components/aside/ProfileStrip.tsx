"use client";
import { useAuth } from "@/providers/AuthContext";
import { db } from "@/utils/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface ProfileStripInterface {
  imageUrl: string;
  isOnline: boolean;
  username: string;
}

const ProfileStrip = ({ imageUrl, isOnline, username }: ProfileStripInterface) => {
  const { user } = useAuth() ?? {};

  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      setStatus(doc.data());
    });
    console.log({status})

    return () => unsubscribe();
  }, [user]);

  const renderProfileStrip = () => {
    return (
      <div className="flex items-center gap-4">
        <div className="w-[70px] h-[70px] relative">
          <img src={`${imageUrl}`} className="w-[70px] h-[70px] rounded-full object-center object-cover" alt="" />
          {status?.state === "online"  && <div className="absolute right-[7px] bottom-[3px] w-3 h-3 bg-text-response rounded-full"></div>}
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-text-dark text-lg font-medium">{username}</h3>
          <span className="text-field-label text-lg font-medium">Account Info</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex py-5 justify-between items-center">
      {renderProfileStrip()}
      <img src="/icons/search-icon.svg" alt="" />
    </div>
  );
};

export default ProfileStrip;
