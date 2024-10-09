import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

function OnePostPage() {
  const [onePost, setOnePost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function fetchOnePost() {
    try {
      const post = await service.get(`/api/posts/${params.postId}`);
      setOnePost(post.data.post);
      setLikes(post.data.post.likes.length);
      setIsLiked(post.data.post.likes.includes(user?._id));
    } catch (error) {
      console.log(error);
    }
  }

  const isOwner = user?._id === onePost?.userId?._id;

  useEffect(() => {
    fetchOnePost();
  }, []);

  async function handleLike() {
    try {
      if (isLiked) {
        await service.post(`/api/posts/${params.postId}/unlike`);
        setLikes(likes - 1);
      } else {
        await service.post(`/api/posts/${params.postId}/like`);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    try {
      const response = await service.delete(`/api/posts/${params.postId}`);
      if (response.status === 204) {
        setTimeout(() => {
          navigate("/");
        }, 200);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  if (!onePost) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen max-w-3xl">
      {isOwner && <Link to={`/${onePost._id}/edit`}>Edit post</Link>}
      <h2 className="md:text-4xl text-lg md:font-bold font-semibold uppercase leading-8 tracking-wide text-slate-800">
        {onePost.title}
      </h2>

      <img
        className="cover-image w-full h-[20vh] md:h-[30vh] lg:h-[40vh] object-cover hover:shadow-lg transition-shadow duration-200"
        src={onePost.image}
        alt="Image of the post"
      />
      <div className="flex justify-between items-center p-2 w-full">
        <p>
          Created by:{" "}
          <Link to={"/profile/" + onePost.userId._id}>
            <span className="underline">{onePost.userId.username}</span>
          </Link>
        </p>
        <p>
          {new Date(onePost.createdAt).toLocaleDateString()}, At{" "}
          {new Date(onePost.createdAt).toLocaleTimeString()}
        </p>
      </div>

      <p
        className="text-slate-600 leading-7 tracking-wide mt-2 first-line:uppercase first-line:tracking-widest
        first-letter:font-bold mb-2 max-w-md first-letter:text-7xl  
        first-letter:mr-3 first-letter:float-left"
      >
        {onePost.description}
      </p>

      <div className="flex items-center gap-2">
        <button onClick={handleLike}>
          {isLiked ? <FcLike /> : <AiFillLike />}
        </button>
        <span>
          {likes} {likes === 1 ? "like" : "likes"}
        </span>
      </div>

      {isOwner && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
}

export default OnePostPage;
