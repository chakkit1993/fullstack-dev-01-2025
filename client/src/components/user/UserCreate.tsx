import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { AddButton } from '../common/Buttons'

const UserCreate = () => {

    const handleOnClick = () => {
        console.log('clicked')
    }

  return (
    <div className='bodder p-8 rounded-md'>
    <form>
     <div className='grid md:grid-cols-2 gap-4 mt-4'>
     <Input type='text' id='username' name='username'  placeholder='Enter username' />
     <Input type='password' id='password' name='password'  placeholder='Enter password' />
     </div>
    <div className='grid md:grid-cols-2 gap-4 mt-4'>
    <Input type='text' id='displayName' name='displayName'  placeholder='Enter displayName' />
    </div>
    <AddButton   handleClick={handleOnClick}  className=' bg-green-500'  text='Add Item'/>
   </form>
</div>

  )
}

export default UserCreate