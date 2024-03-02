import { useState } from 'react'
import DiseasePrediction from './components/DiseasePrediction'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import DoctorRecommend from './components/DoctorRecommend'
import DoctorDetails from './components/DoctorDetails'
import Appointment from './components/Appointment'
import Home from './components/Home'
import DoctorSignUp from './components/DoctorSignUp'
import Feature from './components/Feature'
import DoctorLogin from './components/DoctorLogin'
import UserSignUp from './components/UserSignUp'
import UserLogin from './components/UserLogin'
import DoctorPannel from './components/DoctorPannel'
import DoctorMeet from './components/DoctorMeet'
import DoctorList from './components/DoctorList'


function App() {
  

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/predict-disease' element={<DiseasePrediction/>}></Route>
          <Route path='/doctor-recommendation' element={<DoctorRecommend/>}></Route>
          <Route path="/doctor/:id" element={<DoctorDetails/>}></Route>
          <Route path='/appointment/:id' element={<Appointment/>}></Route>
          <Route path='/doctor-pannel' element={<DoctorPannel/>}></Route>
          <Route path='/doctor-register' element={<DoctorSignUp/>}></Route>
          <Route path='/user-register' element={<UserSignUp/>}></Route>
          <Route path='/user-login' element={<UserLogin/>}></Route>
          <Route path='/features' element={<Feature/>}></Route>
          <Route path='/doctor-login' element={<DoctorLogin/>}></Route>
          <Route path='/doctor-appointment' element={<DoctorMeet/>}></Route>
          <Route path='/doctors' element={<DoctorList/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
