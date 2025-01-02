//import React from 'react'

import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashComp() {
  const [users, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto ">
      <div className="flex-wrap flex gap-4 justify-center">
      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg shadow-lg  ">
        <div className="flex justify-between ">
           <div className="">
            <h2 className="font-bold text-gray-600 uppercase text-lg">Total Users</h2>
            <p>{totalUsers}</p>
           </div>
           <HiOutlineUserGroup className="text-5xl bg-teal-900 text-white rounded-full p-3 shadow-lg" />
           
           </div>
           <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center gap-1">
              <HiArrowNarrowUp className="text-green-500" />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
        </div>
      </div>

      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg shadow-lg  ">
        <div className="flex justify-between ">
           <div className="">
            <h2 className="font-bold text-gray-600 uppercase text-lg">Total Comments</h2>
            <p>{totalComments}</p>
           </div>
           <HiAnnotation className="text-5xl bg-indigo-900 text-white rounded-full p-3 shadow-lg" />
           
           </div>
           <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center gap-1">
              <HiArrowNarrowUp className="text-green-500" />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last Month</div>
        </div>
      </div>

      <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-lg shadow-lg ">
        <div className="flex justify-between ">
           <div className="">
            <h2 className="font-bold text-gray-600 uppercase text-lg">Total Posts</h2>
            <p>{totalPosts}</p>
           </div>
           <HiDocumentText
           className="text-5xl bg-green-900 text-white rounded-full p-3 shadow-lg" />
           
           </div>
           <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center gap-1">
              <HiArrowNarrowUp className="text-green-500" />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last Month</div>
        </div>
      </div>
      </div>
      <div className=" flex flex-wrap py-3 mx-auto gap-4 justify-center">
         <div className="flex flex-col w-full md:auto shadow-lg rounded-lg dark:bg-slate-800 p-2 mt-2">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button gradientDuoTone="purpleToPink" outline><Link to='/dashboard?tab=users'>See All</Link></Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users && users.map((user) => (
               <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell >
                      <img className="w-11 h-11 rounded-full bg-gray-500" src={user.profilePicture} alt={user.username} />
                    </Table.Cell>
                    <Table.Cell>
                       {user.username}
                    </Table.Cell>
                  </Table.Row>
               </Table.Body>
            ))}
          </Table>
         </div>

         <div className="flex flex-col w-full md:auto shadow-lg rounded-lg dark:bg-slate-800 p-2 mt-2">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button gradientDuoTone="purpleToPink" outline><Link to='/dashboard?tab=comments'>See All</Link></Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments && comments.map((comment) => (
               <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                        <p className="line-clamp-1">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>
                       {comment.numberOfLikes}
                    </Table.Cell>
                  </Table.Row>
               </Table.Body>
            ))}
          </Table>
         </div>

         <div className="flex flex-col w-full md:auto shadow-lg rounded-lg dark:bg-slate-800 p-2 mt-2">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button gradientDuoTone="purpleToPink" outline><Link to='/dashboard?tab=posts'>See All</Link></Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts && posts.map((post) => (
               <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img className="w-15 h-11 rounded-md bg-gray-500" src={post.image} alt={post.image} />
                    </Table.Cell>
                    <Table.Cell>
                       {post.title}
                    </Table.Cell>
                    <Table.Cell>
                       {post.category}
                    </Table.Cell>
                  </Table.Row>
               </Table.Body>
            ))}
          </Table>
         </div>
      </div>
    </div>
  )
}
