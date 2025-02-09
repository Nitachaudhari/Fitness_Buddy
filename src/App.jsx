import React from 'react'
import "./App.css"
import Home from "./components/Home/Home"
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from './Pages/Profile/Profile'
import AuthForms from './components/AuthForm'
import EditProfile from './Pages/Profile/EditProfile'
import BuddyFinder from './Pages/BuddyMatching/BuddyFinder'
import { Routes, Route } from "react-router-dom";
import WorkoutTracking from './Pages/Workout_Tracking/WorkoutTracking'
import ProgressReport from './Pages/Progress_Report/ProgressReport'
import ContactUs from './Pages/ContactUs/ContactUs'
import FitnessLibrary from './Pages/FitnessLibrary/FitnessLibrary'
import AboutUs from './Pages/AboutUs/About'
import ProtectedRoutes from "./routes/ProtectedRoutes"
import Chat from './components/Chat/Chat'
import MessagePage from './Pages/Message/MessagePage'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/authform" element={<AuthForms />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/find-buddy" element={<BuddyFinder />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/workout-tracker" element={<WorkoutTracking />} />
        <Route path="/progress-report" element={<ProgressReport />} />
        <Route path="/tips" element={<FitnessLibrary />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path="/message/:buddyId" element={<MessagePage />} />

        {/* <Route element={<ProtectedRoutes />}>
        </Route> */}

        {/* <Route path='/contact'element={<ContactUs/>}/> */}
        {/* <Route path="*" element={<NotFount />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App;