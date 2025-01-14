import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectItemType } from '@/utils/type';



const InputSelect = ({items} :{items:SelectItemType[]}) => {
        const navigate =  useNavigate() 
        const location =  useLocation()
        const pathname = location.pathname

  return (
    <div>
<Select >
   <SelectTrigger className="w-[180px]">
       <SelectValue placeholder="s" />
   </SelectTrigger>
   <SelectContent>
       <SelectGroup>
           {items.map((item) => {
               return <SelectItem value={`${item.value}`}>{item.value}</SelectItem>
           })}
       </SelectGroup>
   </SelectContent>
</Select></div>
  )
}

export default InputSelect