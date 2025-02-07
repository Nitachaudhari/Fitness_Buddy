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
        {/* <Route path="*" element={<NotFount />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
