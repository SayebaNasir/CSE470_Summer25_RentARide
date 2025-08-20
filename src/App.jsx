//import React from 'react'
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Login from './components/login'
//import { useLocation } from 'react-router-dom'
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import Footer from './components/Footer'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const isOwnerpath = useLocation().pathname.startsWith('/owner')
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin}/> }
      {!isOwnerpath && <Navbar setShowLogin={setShowLogin}/>}

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/car-details/:id' element={<CarDetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>

      <Route path='/owner'element={<Layout/>}>
        <Route index element={< Dashboard/>}/>
        <Route path="add-car" element={<AddCar/>}/>
        <Route path="manage-cars" element={<ManageCars/>}/>
        <Route path="manage-bookings" element={<ManageBookings/>}/>
      </Route>
    </Routes>
    
    {!isOwnerpath && <Footer/>}
    </>
  )
}

export default App