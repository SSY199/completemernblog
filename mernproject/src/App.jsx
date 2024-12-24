//import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Projects from "./Pages/Projects";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;