"use client"
import { useAuth } from '@/providers/AuthContext'
import React from 'react'

const Home = () => {
  const {user} = useAuth() ?? {}
  console.log(user)
  return (
    <div>
      Home
    </div>
  )
}

export default Home
