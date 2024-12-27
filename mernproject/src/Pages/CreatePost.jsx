import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const handleUploadImage = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      if (!selectedFile) {
        setImageUploadError('Please select an image');
        return;
      }

      setImageUploadError(null);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to upload image');
      }

      const data = response.data;
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), data.secure_url], // store multiple images
      }));
      setImageUploadProgress(null);
    } catch (error) {
      setImageUploadError('An unexpected error occurred during image upload');
      console.error(error);
      setImageUploadProgress(null);
    }
  };

  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorText = await res.text(); // Read response as plain text
        setPublishError(`Failed to publish post: ${errorText}`);
        return;
      }
  
      const data = await res.json(); // Parse JSON only if the response is successful
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('An unexpected error occurred');
      console.error(error);
    }
  };
  
  
  

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a New Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
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

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' onChange={handleUploadImage} />
          <TextInput
            type='text'
            placeholder='Caption'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline disabled={imageUploadProgress}>
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
              </div>
            ) : (
              'Upload image'
            )}
          </Button>
        </div>

        {imageUploadError && <div className='text-red-500 text-sm'>{imageUploadError}</div>}

        {/* Display images */}
        <div className='image-preview'>
          {formData.images &&
            formData.images.map((image, index) => {
              const transformedImageUrl = image.replace('/upload/', '/upload/c_fill,g_auto,h_300,w_300/');
              return (
                <div key={index} className='relative'>
                  <img src={transformedImageUrl} alt={`Uploaded ${index}`} className='w-full h-72 object-cover mb-4' />
                  <button
                    type='button'
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                    onClick={() => handleDeleteImage(index)}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
        </div>

        <ReactQuill
          theme='snow'
          placeholder='Write your post here...'
          className='h-72 mb-12 dark:text-white'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type='submit' gradientDuoTone='purpleToPink' size='lg' className='w-full'>
          Publish Post
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}

export default CreatePost;