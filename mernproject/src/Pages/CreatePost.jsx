//import React from 'react'

import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePost() {

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try{
  //     const res = await fetch('/api/post/create', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData)
  //     });
  //     const data = await res.json();
  //     if(!res.ok){
  //       setPublishError("Failed to publish post");
  //       return;
  //     }
  //     if (res.ok) {
  //       setPublishError(null);
  //       navigate(`/posts/${data.slug}`);
  //     }  
  //   } catch (error) {
  //     setPublishError("An unexpected error occurred");
  //     console.error(error);
  //   }
  // }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className='text-center text-3xl my-7 font-semibold'>
        Create a New Post
      </h1>
      <form className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type="text" placeholder="Title Required" required id="title" className="flex-1" />
        <Select>
        <option value='uncategorized'>Select a category</option>
            <option value='programming'>Programming</option>
            <option value='politics'>Politics</option>
            <option value='finance'>Finance</option>
            <option value='sports'>Sports</option>
            <option value='entertainment'>Entertainment</option>
            <option value='health'>Health</option>
            <option value='science'>Science</option>
            <option value='other'>Other</option>
        </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-teal-500 border-dotted p-3">
          <FileInput type='file' accept="image/*" /> 
          <TextInput type="text" placeholder="Caption (optional)" />
          <Button type="submit" gradientDuoTone="purpleToBlue" size="sm" outline>Upload Image</Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write your post here..." className="h-72 mb-12 dark:text-white" required
        />
        <Button  gradientDuoTone="purpleToBlue" type="submit"  >
          Publish Post
        </Button>
        
      </form>
      
    </div>
  )
}

export default CreatePost