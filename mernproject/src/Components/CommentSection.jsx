import { Button, Textarea } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.length > 300) {
        alert('Comment must be less than 300 characters');
        return;
      }
      const response = await fetch(`/api/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        })
      });
      const commentData = await response.json();

      if (!response.ok) {
        throw new Error(commentData.message || 'Failed to create comment');
      }
      setComment('');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-600 text-sm lg:ml-auto">
          <p className="">Signed in as:</p>
          <img className="h-6 w-6 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
          <Link to={'/dashboard?tab=profile'} className="text-sm text-cyan-500 hover:underline">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-400 my-5 flex gap-1">
          You must be logged in to comment.
          <Link to={'/login'} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
          <Textarea placeholder="Write a Comment..." rows='3' maxLength='300'
            onChange={(e) => setComment(e.target.value)} value={comment}></Textarea>
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500">{300 - comment.length} characters remaining</p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
        </form>
        
      )}
    </div>
  );
}