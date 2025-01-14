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
const PageSizeSelect = ({limitList , defualtValue , sendDataToParent  } : {limitList :number[]  , defualtValue?:number ,sendDataToParent: (value:string)=>void }) => {
    const navigate =  useNavigate() 


    //const limitList = [5, 10, 15, 20, 25, 30];
    const location =  useLocation()
    const pathname = location.pathname

    const [sizePage , setSizePage] = useState<number>(10);

    console.log('defualtValue' , defualtValue)
    
    useEffect(() => {
        setSizePage(defualtValue ? defualtValue : 10)
        console.log('setSizePage' , sizePage)
        //setCurrPage(Number(page))
        //setSizePage(Number(limit))
        //console.log('limit',sizePage)
        //console.log('page',currPage)
        //console.log("message",pathname)
    },[sizePage])

    const handleVaule  = (value: string) =>{
   
        sendDataToParent(value);
        //window.location.reload();
    }
  return (
    <div>
        {sizePage}
    <Select  defaultValue={String(sizePage)} onValueChange={handleVaule}>
       <SelectTrigger className="w-[180px]">
           <SelectValue placeholder={sizePage} />
       </SelectTrigger>
       <SelectContent>
           <SelectGroup>
               {limitList.map((limit) => {
                   return <SelectItem value={`${limit}`}>{limit}</SelectItem>
               })}
           </SelectGroup>
       </SelectContent>
   
   </Select></div>
  )
}

export default PageSizeSelect