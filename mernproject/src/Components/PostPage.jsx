import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "./CallToAction";
import CommentSection from "./CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await response.json();
        if (!response.ok) {
          setShowError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
      } catch {
        setShowError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl"></Spinner>
      </div>
    );
  }

  if (showError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Error loading post. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="p-4 flex flex-col max-w-4xl mx-auto min-h-screen space-y-4">
      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-center">
        {post?.title}
      </h1>

      {/* Category Button */}
      <div className="flex justify-center">
        <Link to={`/search?category=${post?.category}`}>
          <Button color="gray" pill size="sm">
            {post?.category}
          </Button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="flex justify-center">
        <img
          src={post?.image}
          alt={post?.title}
          className="cursor-pointer rounded-lg shadow-md w-full max-h-[400px] object-cover"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Metadata */}
      <div className="flex justify-between text-sm text-gray-500 px-3 border-b border-gray-300">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content */}
      <div
        className="prose prose-sm sm:prose lg:prose-lg mx-auto"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>

      {/* Call to Action */}
      <div className="mt-4">
        <CallToAction />
      </div>

      {/* Comments Section */}
      <CommentSection postId={post?._id} />

      {/* Modal for Viewing the Full Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={post?.image}
            alt={post?.title}
            className="max-w-full max-h-full rounded-lg shadow-lg object-contain"
          />
        </div>
      )}
    </main>
  );
}
