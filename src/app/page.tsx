"use client"
import { useAuth } from '@/providers/AuthContext'
import React from 'react'

const Home = () => {
  const {user} = useAuth() ?? {}
  return (
    <div>
      Home
    </div>
  )
}

export default Home
