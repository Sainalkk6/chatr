"use client"
import React, { useState } from 'react'

const CategorySelector = () => {
    const [isActive,setIsActive] = useState("All")

    const handleClick = (label:string)=>{
        setIsActive(label)
    }
    const renderCategoryButton = (label:string)=>{
        return (
            <button onClick={()=> handleClick(label)} className={`flex items-center text-text-dark justify-center py-2 px-7 rounded-full ${isActive === label ? "bg-white" : "bg-transparent"}`}>{label}</button>
        )
    }

  return (
    <div className='flex p-4 justify-between items-center rounded-full bg-[#f7f7f7]'>
        {renderCategoryButton("All")}
        {renderCategoryButton("Personal")}
        {renderCategoryButton("Groups")}
    </div>
  )
}

export default CategorySelector
