import "./App.css";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import IsLoggedOut from "./components/Routing/IsLoggedOut";
import IsLoggedIn from "./components/Routing/IsLoggedIn";
import OnePostPage from "./pages/OnePostPage";
import EditPostPage from "./pages/EditPostPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<IsLoggedIn />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/:postId" element={<OnePostPage />} />
          <Route path="/:postId/edit" element={<EditPostPage />} />
          <Route path="/profile/:id" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
