"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const User = () => {
  const {userId} = useParams();
  return (
    <div>
      User - {userId}
    </div>
  )
}

export default User