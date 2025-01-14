import React, { useEffect, useState } from 'react'
import { CategoryType } from '../../utils/type'
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

const CategoryTable = ({categories} : {categories : CategoryType[]}) => {

  const location =  useLocation()
  const pathname = location.pathname

    const [categoryList, setCategory] = useState<CategoryType[]>([])
    
    const navigate =  useNavigate() 
    //console.log(categories)
      useEffect(() => {
        setCategory(categories)
        //console.log(categoryList)



      },[categoryList]);

 
      
      function handleDeleteClick(id: number) {

      const deleteItem= async () => {
        await axios.delete(`http://localhost:8080/api/category/${id}`).then(function (response) {
          //console.log(response.data);
          const resData  = response.data;
          //setCategory(resData)
          console.log("resData",resData)
          navigate(`${pathname}` ,  { replace: true });
          window.location.reload();
        
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      }

      deleteItem()


    }


  return (
<div className='justify-center mt-20'>
    <Table className='border border-separate  border-solid border-neutral-900 p-8 rounded-xl '>
      <TableCaption>A list of your recent tranasction.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>ID</TableHead>
          <TableHead className='text-center'>Name</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryList.map((item ,count) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell className='text-center'>{item.displayName}</TableCell>
            <TableCell><Button className='bg-red-500 p-2 rounded-md text-white' onClick={() => handleDeleteClick(item.id)} >Delete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
    </div>
  )
}

export default CategoryTable