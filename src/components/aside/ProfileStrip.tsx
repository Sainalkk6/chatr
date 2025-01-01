import React from 'react'
import { SlMagnifier } from 'react-icons/sl';

interface ProfileStripInterface {
    imageUrl:string;
    isOnline:boolean;
    username:string;
}

const ProfileStrip = ({imageUrl,isOnline,username}:ProfileStripInterface) => {

    const renderProfileStrip = ()=>{
        return (
            <div className="flex items-center gap-4">
                <div className="w-[70px] h-[70px] relative">
                    <img src={`${imageUrl}`} className='w-[70px] h-[70px] rounded-full object-center object-cover' alt="" />
                    {isOnline && <div className='absolute right-[7px] bottom-[3px] w-3 h-3 bg-text-response rounded-full'></div>}
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className='text-text-dark text-lg font-medium'>{username}</h3>
                    <span className='text-field-label text-lg font-medium'>Account Info</span>
                </div>
            </div>
        )
    }

  return (
    <div className='flex py-5 justify-between items-center'>
        {renderProfileStrip()}
        <img src="/icons/search-icon.svg" alt="" />
    </div>
  )
}

export default ProfileStrip
