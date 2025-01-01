"use client"
import React, { useEffect, useState } from 'react'
import ProfileStrip from '../aside/ProfileStrip'
import { useAuth } from '@/providers/AuthContext';
import Loader from './Loader';

import { createContext } from 'vm';
import ChatIntitationContainer from '../aside/ChatInitiationContainer';


const Aside = () => {
    
    const { user } = useAuth() ?? {};

    const [userData, setUserData] = useState<{ email: string; username: string,profileImage:string }>();
  
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
    
    <div className='flex flex-col w-full max-w-[430px] p-6 gap-7 bg-default  rounded-3xl'>
      <ProfileStrip imageUrl={userData.profileImage} isOnline username={userData.username} />
      <ChatIntitationContainer/>
    </div>
  )
}

export default Aside
