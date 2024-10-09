import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";

function UserProfilePage() {
  const [posts, setPosts] = useState(null);
  const [profile, setProfile] = useState(null);
  const params = useParams();

  async function fetchPosts() {
    try {
      const response = await service.get(`/api/users/${params.id}`);
      console.log("response", response.data.pets);
      setPosts(response.data.pets);
      setProfile(response.data.user);
    } catch (error) {
      // setPosts(null);
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  if (!profile || !posts) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <p>{profile.username}'s profile</p>
      <p>{posts.length} post(s) published</p>
      <div className="flex  gap-8 md:gap-12 flex-wrap container mx-auto items-center justify-center  h-full py-10">
        {posts.map((post) => {
          return (
            <div className="">
              <p>{post.title}</p>
              <img src={post.image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfilePage;
