import React from 'react'
import "./App.css"
import Home from "./Pages/Home/Home"
import Footer from './Pages/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Profile from './Pages/Profile'
import Dashboard from './Pages/Dashboard'
import AuthForms from './components/AuthForm'
import EditProfile from './Pages/EditProfile'
import BuddyFinder from './components/BuddyMatching/BuddyFinder'
import { Routes, Route } from "react-router-dom";
import WorkoutTracking from './Component/Workout_Tracking/WorkoutTracking'


// import FitnessLibrary from './components/FitnessLibrary/FitnessLibrary'
import ContactUs from './Pages/ContactUs/ContactUs'
import FitnessLibrary from './components/FitnessLibrary/FitnessLibrary'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/authform" element={<AuthForms/>} />

        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/find-buddy" element={<BuddyFinder/>} />
        <Route path="/edit-profile" element={<EditProfile/>}/>
        <Route path="/workout-tracker" element={<WorkoutTracking/>}/>
        <Route path="/progress-report" element={<ProgressReport/>}/>
        {/* <Route path="/tips" element={<FitnessLibrary/>}/> */}
        <Route path='/contact'element={<ContactUs/>}/>
        <Route path="/tips" element={<FitnessLibrary/>}/>
        {/* <Route path='/contact'element={<ContactUs/>}/> */}
        {/* <Route path="*" element={<NotFount />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App;