// Register.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../helper/auth"; // Path to your authService.js

const Register = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password); // Replace with actual registration credentials
      console.log("Registered user:", user);
      setShowModal(true);
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
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
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
