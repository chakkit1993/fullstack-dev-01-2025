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

    const handleOnClick = async () => {

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
        console.log(categoryName)
    },[categoryName])

  return (
    <div className='border  border-solid border-neutral-900 p-8 rounded-md mt-20'>
        <form onSubmit={handleOnClick}>
        <Input type='text' id='displayName' name='displayName' onChange={ (e) => {setCategoryName(e.target.value)}} ></Input> 
        <Button  type='submit'  className=' bg-green-500'  >Add</Button>
        </form>
   
    </div>
  )
}

export default CategoryCreate