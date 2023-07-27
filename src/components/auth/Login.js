// Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../helper/auth";
// import { loginUser } from "../../reducer/authSlice";
import { loginUser } from "../../reducer/userAuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(email, password)); // Replace with actual login credentials
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="text-black block w-full px-3 py-2 border border-foreground rounded-md shadow-sm placeholder-foreground focus:outline-none focus:ring focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="text-black block w-full px-3 py-2 border border-foreground rounded-md shadow-sm placeholder-foreground focus:outline-none focus:ring focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

// // LoginForm.js

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../path/to/authService'; // Path to your authService.js

// const LoginForm = () => {
//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await loginUser(email, password);
//       console.log('Logged in user:', user);
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   return (

//   );
// };

// export default LoginForm;
