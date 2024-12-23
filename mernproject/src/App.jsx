 //import React from 'react'
 import { BrowserRouter, Routes, Route } from "react-router-dom"
 //import { Router } from "react-router"
 import About from "./Pages/About"
import Dashboard from "./Pages/Dashboard"
import Home from "./Pages/Home"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Projects from "./Pages/Projects"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
 function App() {
   return (
      <BrowserRouter>
      <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

         </Routes>
         <Footer />
      </BrowserRouter>
   )
 }
 
 export default App