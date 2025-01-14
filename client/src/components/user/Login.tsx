import React, { ReactEventHandler, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {


  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const navigate =  useNavigate()
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    console.log('clicked')
    await axios.post('http://localhost:8080/api/login',{username,password})
     .then(function (response) {
      const resData  = response.data;
      console.log("resData",resData)
      localStorage.setItem("token", resData.token); 
      navigate('/transaction' , {replace: true});
    })
    .catch(function (error) {
      alert(error.message)
      navigate('/login' , {replace: true});
      console.log('error' ,error.message);
    })
    .finally(function () {
      // always executed
    });
  }

   
  
  return (
    <div className='bodder p-8 rounded-md'>
    <form onSubmit={handleSubmit}>
     <div className='grid md:grid-cols-3 gap-4 mt-4'>
     <Input type='text' id='username' name='username' onChange={ (e) => {setUsername(e.target.value)}} placeholder='Enter username' />
     <Input type='password' id='password' name='password'  onChange={ (e) => {setPassword(e.target.value)}} placeholder='Enter password' />
     <Button type='submit'  className=' bg-green-500'  >Login</Button>
     </div>
    
   </form>
</div>
  )
}

export default Login