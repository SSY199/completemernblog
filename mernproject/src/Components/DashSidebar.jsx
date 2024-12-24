//import React from 'react'

import { Sidebar } from "flowbite-react"
import { HiArrowSmRight, HiUser } from "react-icons/hi"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('profile');
  useEffect (() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className=" md:w-56 bg-gray-100 dark:bg-gray-800">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
           <Sidebar.Item active={tab === "profile"} icon={HiUser} label={"User"} labelColor='dark'>
            Profile
           </Sidebar.Item>
          </Link>
           <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
           </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items> 
    </Sidebar>
  )
}

export default DashSidebar