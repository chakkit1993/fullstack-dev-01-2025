import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { redirect, useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  useEffect(() => {

  },[])
    const handdleLogin = () => {
        console.log('login')
        navigate("/login", { replace: true }); 
    }
    const handdleLogout= () => {
        console.log('login')
        localStorage.removeItem('token')
        navigate("/", { replace: true }); 
    }
    const handdleRegister = () => {
        console.log('login')
        navigate("/register", { replace: true }); 
    }
  return (
    <header className="">
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <a className="flex flex-shrink-0 items-center" href="/">
            <h1>Logo</h1>
            </a>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
              {token ? <Button className="bg-blue-500" onClick={handdleLogout}>Logout</Button>  :
             <div>
                <Button className="bg-blue-500 mx-4 " onClick={handdleLogin}>Login</Button>
                <Button className="bg-blue-500 mx-4"  onClick={handdleRegister}>Register</Button> 
              </div>
                }
          </div>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default NavBar