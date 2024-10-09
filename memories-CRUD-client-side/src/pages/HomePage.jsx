import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import service from "../service/api";

function HomePage() {
  const [posts, setPosts] = useState(null);
  const { user } = useContext(AuthContext);

  async function fetchPosts() {
    try {
      const response = await service.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      setPosts(null);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex  gap-8 md:gap-12 flex-wrap container mx-auto items-center justify-center  h-full py-10">
      {posts &&
        posts.map((onePost) => (
          <div
            className="w-full md:w-1/4 lg:w-1/3 flex flex-col px-2 md:px-0"
            key={onePost._id}
          >
            {/* <h2>{onePost.title}</h2>
              <p>{onePost.description}</p> */}
            <Link to={onePost._id}>
              <img
                className="cover-image w-full h-[20vh] md:h-[30vh] lg:h-[40vh] object-cover hover:shadow-lg transition-shadow duration-200"
                src={onePost.image}
                alt="Image of the post"
              />
            </Link>
          </div>
        ))}
    </div>
  );
}

export default HomePage;
