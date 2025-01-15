import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const CategoryCreate = () => {

    const location =  useLocation()
    const pathname = location.pathname
    const navigate =  useNavigate() 
    const [categoryName , setCategoryName] = React.useState('')

    const handleOnClick = async (e:any) => {
        e.preventDefault()
        await axios.post('http://localhost:8080/api/category', {categoryName})
          .then(function (response) {
            console.log('created category successfully');
            const resData  = response.data.data;
            //setCategory(resData)
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
    
    useEffect(() =>{
        //console.log(categoryName)
    },[categoryName])

  return (
    <div className='border  border-solid border-neutral-900 p-8 rounded-md mt-20'>
       <h1>Create Category</h1>
        <form onSubmit={handleOnClick}>
        <div className='flex flex-cols-2  mt-4'>
          <Input type='text' id='displayName' name='displayName' placeholder='category name' onChange={ (e) => {setCategoryName(e.target.value)}} ></Input> 
          <Button  type='submit'  className=' bg-green-500 mx-4'  >Add</Button>
          </div>
     
        </form>
    </div>
  )
}

export default CategoryCreate