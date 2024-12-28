import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UpdatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if(res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);

        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

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
      const transformedImageUrl = data.secure_url.replace('/upload/', '/upload/c_fill,g_auto,h_300,w_300/');
      setFormData((prev) => ({
        ...prev,
        image: transformedImageUrl, // store single image
      }));
      setImageUploadProgress(null);
    } catch (error) {
      setImageUploadError('An unexpected error occurred during image upload');
      console.error(error);
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setPublishError(`Failed to update post: ${errorText}`);
        return;
      }

      const data = await res.json();
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('An unexpected error occurred');
      console.error(error);
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title || ''}
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category || ''}
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
            value={formData.caption || ''}
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

        {/* Display image */}
        {formData.image && (
          <div className='relative'>
            <img src={formData.image} alt='Uploaded' className='w-full h-72 object-cover mb-4' />
            <button
              type='button'
              className='absolute top-0 right-0 bg-red-500 text-white h-6 w-6 flex items-center justify-center'
              onClick={() => setFormData((prev) => ({
                ...prev,
                image: null,
              }))}
            >
               x
            </button>
          </div>
        )}

        <ReactQuill
          theme='snow'
          value={formData.content || ''}
          placeholder='Write your post here...'
          className='h-72 mb-12 dark:text-white'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type='submit' gradientDuoTone='purpleToPink' size='lg' className='w-full'>
          Update Post
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}

export default UpdatePost;