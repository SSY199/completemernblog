//import React from 'react'
import { Alert, Button, Label, Spinner } from "flowbite-react"
import { Link, useNavigate } from "react-router-dom"
import { TextInput } from "flowbite-react"
import { useState } from "react"
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      if(!formData.username || !formData.email || !formData.password) {
        setErrorMessage("All fields are required");
        return;
      }
      try {
        setLoading(true);
        setErrorMessage(null);
        const res = await fetch('/api/auth/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          return setErrorMessage(data.message);
        }
        setLoading(false);
        if(res.ok) {
          navigate("/");
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
         
      }  
    }
  return (
     
    <div className="min-h-screen bg-purple-400 flex items-center justify-center">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1 text-center md:text-left">
          <Link to={"/"}>
            <h1 className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-lg text-black">DEV</span>NINJAS
            </h1>
          </Link>
          <p className="mt-4 text-lg dark:text-white animate-typing">
            Welcome to Dev-Ninjas, a platform where developers share their knowledge, experiences, and projects. Join our community to stay updated with the latest trends in technology, collaborate on exciting projects, and enhance your skills.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 bg-purple-600 p-4 rounded-lg" onSubmit={handleSubmit}>
            {/* username */}
            <div className="mb-2">
              <Label value="Your Username" className="font-bold"></Label>
              <TextInput type="text" id="username" onChange={handleChange} placeholder="username" />
            </div>
            {/* email */}
            <div className="mb-4">
              <Label value="Your Email" className="font-bold"></Label>
              <TextInput type="email" id="email" onChange={handleChange} placeholder="name@gmail.com" />
            </div>
            <div className="mb-4">
              <Label value="Password" className="font-bold"></Label>
              <TextInput type="password" id="password" onChange={handleChange} placeholder="********" />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading} className="text-black">
              {
                loading? (
                  <>
                  <Spinner size="md" />
                  <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )
              }
            </Button>
          </form>
          <div className="flex justify-center gap-3">
            <span>Already have an Account?</span>
            <Link to="/signin" className="text-blue-600">Sign-In</Link>
          </div>
          {
            errorMessage && (
              <Alert className="text-center mt-3" color="failure">{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
     
  )
}

export default Signup