//import React from 'react'
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, showError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
     const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await response.json();
        if (!response.ok) {
          showError(true);
          setLoading(false);
          return;
        }
        if (response.ok) {
          setPost(data.posts[0]);
          setLoading(false);

          // Add post views count logic here

          // Example: Update post views count
          // const views = data.posts[0].views + 1;
          // await fetch(`/api/post/updatepostviews/${data.posts[0]._id}`, {
          //   method: 'PUT',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ views }),
          // });

          // const updatedPost = await fetch(`/api/post/getposts?slug=${postSlug}`);
          // const updatedData = await updatedPost.json();
          // setPost(updatedData.posts[0]);
        }
      } catch (error) {
        showError(true);
        setLoading(false);
      }
     }
     fetchPost();
  }, [postSlug]);

  if(loading) {
    return <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl"></Spinner>
    </div>
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <Button color="gray" pill size="sm">{post && post.category}</Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[600px] max-w-[1200px] shadow-2xl object-cover" />
      <div className="flex justify-between p-3 border-b border-slate-600 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="p-3 max-w-3xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.content}}>

      </div>
    </main>
  )
}
