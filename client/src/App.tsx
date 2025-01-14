import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TranasctionContainer from './components/transaction/TranasctionContainer'
import CategoryContainer from './components/category/CategoryContainer';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Home from './components/home/Home';
import NavBar from './components/common/Navbar';

function App() {
  return (
    <>
 
    <BrowserRouter>
       <NavBar/>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="/transaction" element={<TranasctionContainer />} />
          <Route path="/category" element={<CategoryContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
