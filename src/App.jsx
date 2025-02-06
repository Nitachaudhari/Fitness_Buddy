import React from 'react'
import "./App.css"
import Home from "./Pages/Home/Home"
import Footer from './Pages/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFount />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App;