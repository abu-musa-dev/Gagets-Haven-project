// src/pages/Login.jsx
import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
// src/pages/Login.jsx
import { auth, googleProvider, facebookProvider } from "../firebase"; // .js extension লাগবে না
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result.user);
        toast.success("Logged in with Google!");
        navigate('/');
      })
      .catch(error => {
        console.error(error);
        toast.error("Google login failed!");
      });
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        console.log(result.user);
        toast.success("Logged in with Facebook!");
        navigate('/');
      })
      .catch(error => {
        console.error(error);
        toast.error("Facebook login failed!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-violet-700">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-violet-700 text-white py-2 rounded-md hover:bg-violet-800 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center mb-2 text-gray-500">or login with</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleGoogleLogin}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              <i className="fa-brands fa-google mr-2"></i>Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <i className="fa-brands fa-facebook mr-2"></i>Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
