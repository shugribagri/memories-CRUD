import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../service/api";
import { Email, Password } from "@mui/icons-material";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.post("/auth/signup", formData);
      console.log(response);
      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
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

  const { username, email, password } = formData;

  return (
    <form
      className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <label htmlFor="username">Username: </label>
        <input
          className="mt-1 mb-4 p-2 w-full outline-dotted outline-slate-800 rounded-md text-gray-700"
          type="text"
          id="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="w-full">
        <label htmlFor="email">Email: </label>
        <input
          className="mt-1 mb-4 p-2 w-full outline-dotted outline-slate-800 rounded-md text-gray-700"
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="w-full">
        <label htmlFor="password">Password: </label>
        <input
          className="mt-1 mb-4 p-2 w-full outline-dotted outline-slate-800 rounded-md text-gray-700"
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <p className="error">{errorMessage}</p>

      <p>
        Already have an account?{" "}
        <Link to={"/login"}>
          <span className="underline">Login.</span>
        </Link>
      </p>
      <button className="w-full p-2 rounded bg-green-600 hover:bg-purple-500 transition-colors font-bold ">
        Signup
      </button>
    </form>
  );
}

export default SignupPage;
