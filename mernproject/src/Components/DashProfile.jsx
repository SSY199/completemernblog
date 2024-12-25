import { TextInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { updateUserProfile } from '../redux/user/userSlice';
import supabase from '../supabase';

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
  });
  const filePickerRef = useRef();

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const formData = new FormData();
        formData.append('file', imageFile);

        const { error } = await supabase.storage
          .from('imagebucket') // Use your bucket name
          .upload(`public/${imageFile.name}`, formData, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) {
          throw error;
        }

        const { publicURL } = supabase.storage
          .from('imagebucket') // Use your bucket name
          .getPublicUrl(`public/${imageFile.name}`);

        setImageFileUrl(publicURL.publicURL);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profilePictureUrl = imageFileUrl || currentUser.profilePicture;

    const updatedUser = {
      ...formData,
      profilePicture: profilePictureUrl,
    };

    try {
      const res = await fetch(`/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error updating profile:', errorData.message);
        return;
      }

      const data = await res.json();
      dispatch(updateUserProfile(data));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div
          className="w-32 h-32 self-center cursor-pointer relative rounded-full shadow-md overflow-hidden mt-4"
          onClick={() => filePickerRef.current.click()}
        >
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" className="w-full h-full border-2 border-[lightray] object-cover" />
        </div>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type="password" id="password" placeholder="password" onChange={handleChange} />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-600 flex justify-between gap-4 mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign-Out</span>
      </div>
    </div>
  );
}

export default DashProfile;