//import React from 'react'
import { Button, Label } from "flowbite-react"
import { Link } from "react-router-dom"
import { TextInput } from "flowbite-react"
import './Signup.css';

function Signup() {
  return (
     
    <div className="min-h-screen bg-purple-400 flex items-center justify-center">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 " >
        {/* left */}
        <div className="flex-1">
        <Link to={"/"}>
        <h1 className="font-bold dark:text-white text-4xl">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-lg text-black">DEV</span>NINJAS
        </h1>
      </Link>
      <p className="mt-4 text-lg dark:text-white ">
      Welcome to Dev-Ninjas, a platform where developers share their knowledge, experiences, and projects. Join our community to stay updated with the latest trends in technology, collaborate on exciting projects, and enhance your skills.
      </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4 bg-purple-600 p-4 rounded-lg">
            {/* username */}
            <div className="mb-2">
               <Label value="Your Username" className="font-bold"></Label>
               <TextInput type="text" id="username" placeholder="username" />
            </div>
            {/* email */}
            <div className="mb-4">
               <Label value="Your Email" className="font-bold"></Label>
               <TextInput type="text" id="Email" placeholder="name@gmail.com" />
            </div>
            <div className="mb-4">
               <Label value="Password" className="font-bold"></Label>
               <TextInput type="text" id="password" placeholder="******" />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" className="text-black">Sign-Up</Button>
          </form>
          <div className="flex justify-center gap-3">
            <span>Already have an Account?</span>
            <Link to="/signin" className="text-blue-600">Sign-In</Link>

          </div>
        </div>
      </div>
    </div>
     
  )
}

export default Signup