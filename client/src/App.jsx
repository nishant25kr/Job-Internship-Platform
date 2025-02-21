import React from 'react'
import Signup from '../Component/Signup/Signup'
import './App.css'
import Login from '../Component/Login/Login'
import Home from '../Component/Home/Home'
import Navbar from '../Component/Navbar/Navbar'
import Jobs from '../Component/Jobs/Jobs'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/' element={<Jobs />} /> */}
          <Route path='/' element={<Jobs />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>

  )
}
