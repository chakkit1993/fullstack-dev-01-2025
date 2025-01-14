import { CategoryType } from '@/utils/type'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
const CategorySelect = ({categories}: {categories:CategoryType[]}) => {

    const [categoryList, setCategory] = useState<CategoryType[]>([])

    useEffect(() => {
        setCategory(categories)
    }, [categoryList]);
    
  return (
    <div>        
        <Select
 >
    <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
            {categoryList.map((category) => {
                return <SelectItem key={category.id} value={category.displayName}>{category.displayName}</SelectItem>
            })}
        </SelectGroup>
    </SelectContent>

</Select></div>
  )
}

export default CategorySelect