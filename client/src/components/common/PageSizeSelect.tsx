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
const PageSizeSelect = ({limitList , defualtValue , callBackPageSize  } : {limitList :number[]  , defualtValue?:number ,callBackPageSize: (value:string)=>void }) => {
    const navigate =  useNavigate() 


    const location =  useLocation()
    const pathname = location.pathname

    const [sizePage , setSizePage] = useState<number>(10);
    
    useEffect(() => {
        setSizePage(defualtValue ? defualtValue : 10)

    },[sizePage])

    const handleVaule  = (value: string) =>{
   
        callBackPageSize(value);
        //window.location.reload();
    }
  return (
    <div>
    <Select  defaultValue={String(sizePage)} onValueChange={handleVaule}>
       <SelectTrigger className="w-[180px]">
           <SelectValue placeholder={sizePage} />
       </SelectTrigger>
       <SelectContent>
           <SelectGroup>
               {limitList.map((limit , key) => {
                   return <SelectItem key={key} value={`${limit}`}>{limit}</SelectItem>
               })}
           </SelectGroup>
       </SelectContent>
   
   </Select></div>
  )
}

export default PageSizeSelect