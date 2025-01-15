import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import InputFile from '../common/InputFile'

import { CategoryType } from '@/utils/type'
import axios from 'axios'
import CategorySelect from '../common/CategorySelect'
import { Button } from '../ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
const TranasctionCreate = () => {

    const [categoryList, setCategory] = useState<CategoryType[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const location =  useLocation()
    const pathname = location.pathname
    const navigate =  useNavigate() 


    const token = localStorage.getItem('token');

    const  getCategories = async () => {
        setIsLoading(true)
        let data :CategoryType[] = [];
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get(`http://localhost:8080/api/categories?limit=${100}`)
        .then(function (response)  {
          const resData  = response.data;
          //console.log("resData",resData)
          data = resData.data;
         
        
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
 
          console.log("resData finally")
          setIsLoading(false);
          return data;
        });

        // setCategory([
        //     {key: 'Select a company', value: ''}, 
        //     ...results
        //   ])
      }

    useEffect(() =>{
         //const data =  getCategories();
         //console.log(data);
    },[]);

    const [displayName, setDisplayName] = useState('')
    const [amount, setAmount] = useState('')
    const [note, setNote] = useState('')
    const [categoryId, setCategoryId] = useState()
    const [image, setImage] = useState<File|undefined>()

    const handleOnClick = async (e:any) => {
        e.preventDefault();
        if(typeof image === 'undefined') return;
        const formData= new FormData();
        formData.append('amount', amount);
        formData.append('note', note);
        formData.append('categoryId', '1');
        formData.append('image', image);
     

        // Display the values
        for (const value of formData.values()) {
        console.log(value);
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        await axios.post('http://localhost:8080/api/transaction', formData  )
          .then(function (response) {
            console.log('created transaction successfully');
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

    function handleDataFromChild(data : File) {
      setImage(data);

      console.log('childData',data);
    }

  return (
    <div className='border  border-solid border-neutral-900 p-8 rounded-md mt-20'>
        <h1>Create Tranaction</h1>
        <form onSubmit={handleOnClick} encType='multipart/form-data'>
         <div className='grid md:grid-cols-2 gap-4 mt-4'>
         <Input type='text' id='displayName' name='displayName'  placeholder='Enter name'  onChange={ (e) => {setDisplayName(e.target.value)}}/>
         <Input type='text' id='amount' name='amount'  placeholder='Enter amount' onChange={(e) => {setAmount(e.target.value)}}/>
         </div>
         <Textarea className='mt-4' name='note' id='note' placeholder="Type your message here."  onChange={(e) => {setNote(e.target.value)}}/>
        <div className='grid md:grid-cols-2 gap-4 mt-4'>
        {/* {isLoading ? <div>isLoading....</div> : <CategorySelect categories={categoryList}></CategorySelect>} */}
        </div>
        <InputFile  handleChange={handleDataFromChild}  name="image" label="Silp Image" />
        <Button   className=' bg-green-500' >Add</Button>
       </form>
</div>


  )
}

export default TranasctionCreate