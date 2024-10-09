import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";

function EditPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const nav = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const editform = {
      title,
      description,
    };

    try {
      const response = await service.put(
        `/api/posts/${params.postId}`,
        editform
      );
      console.log(response);
      nav(-1);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOnePost() {
    try {
      const res = await service.get(`/api/posts/${params.postId}`);
      console.log(res);
      setTitle(res.data.post.title);
      setDescription(res.data.post.description);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOnePost();
  }, []);

  return (
    <form
      className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <label htmlFor="title">Title:</label>
        <input
          className="mt-1 mb-4 p-2 w-full outline-dotted outline-slate-800 rounded-md text-gray-700"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div className="w-full">
        <label htmlFor="description">Description:</label>
        <input
          className="mt-1 mb-4 p-2 w-full outline-dotted outline-slate-800 rounded-md text-gray-700"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>

      <button className="w-full p-2 rounded bg-green-600 hover:bg-purple-500 transition-colors font-bold ">
        Edit Post
      </button>
    </form>
  );
}

export default EditPostPage;
