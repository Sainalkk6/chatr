"use client";
import PersonalForm from "@/components/forms/PersonalForm";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/providers/AuthContext";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth() ?? {};
  const [userData, setUserData] = useState<{ email: string; username: string }>();

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get-user/${user.uid}`);
        const data = await response.json();
        setUserData(data);
      };
      getUser();
    }
  }, [user]);

  if (!user || !userData) {
    return <Loader />;
  }

  return (
    <div className="flex w-full">
      <img src="/images/profile-page.png" className="lg:h-screen w-full max-w-[50%] object-cover" />
      <div className="flex justify-center items-center w-full max-w-[50%] flex-col gap-10 p-8">
        <h1 className="text-3xl font-medium">Add Personal Details</h1>
        <PersonalForm uid={user.uid} email={userData?.email} />
      </div>
    </div>
  );
};

export default ProfilePage;
