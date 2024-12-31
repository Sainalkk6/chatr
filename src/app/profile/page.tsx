import PersonalForm from '@/components/forms/PersonalForm'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className='flex w-full'>
      <img src="/images/profile-page.png" className='lg:h-screen w-full max-w-[50%] object-cover'/>
      <div className="flex justify-center items-center w-full max-w-[50%] flex-col gap-10">
            <h1 className='text-3xl font-medium'>Add Personal Details</h1>
            <PersonalForm/>
      </div>
    </div>
  )
}

export default ProfilePage
