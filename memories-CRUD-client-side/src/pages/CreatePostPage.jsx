import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service/api";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const nav = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("image", image);

    try {
      const response = await service.post("/api/posts", fd);
      console.log(response);
      if (response.status === 201) {
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <label
          className="block mb-2 text-sm font-medium text-gray-300"
          htmlFor="title"
        >
          Title:
        </label>
        <input
          className="p-2 border border-gray-300 rounded w-full"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <div className="w-full">
        <label
          className="block mb-2 text-sm font-medium text-gray-300"
          htmlFor="description"
        >
          Description:
        </label>
        <input
          className="p-2 border border-gray-300 rounded w-full"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <div className="w-full">
        <label
          className="block mb-2 text-sm font-medium text-gray-300"
          htmlFor="image"
        >
          Pet picture:
        </label>
        <input
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
          type="file"
          id="image"
          onChange={(e) => setImage(e.currentTarget.files[0])}
        />
      </div>

      <button className="w-full p-2 text-slate-800 hover:text-green-900 text-md md:text-lg rounded bg-green-600 hover:bg-purple-500 transition-colors font-bold ">
        Create Post
      </button>
    </form>
  );
}

export default CreatePostPage;
