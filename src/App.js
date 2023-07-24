import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Helper functions
import { checkLoggedInUser, logoutUser } from "./helper/auth"; // Path to your authService.js
import firebase, { auth } from "./firebase/firebaseConfig"; // Path to your firebaseConfig.js

// Components
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";

export default function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    // Listen for auth state changes (logged in or logged out)

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Unsubscribe from the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Helper function to check if the user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  if (loading) {
    // Render a loading component while we check authentication state
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Layout user={user} isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/register"
            element={
              <Register
                isAuthenticated={isAuthenticated}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
          {/* <ProtectedRoute path="/skills" element={<Skills />} /> */}
          <Route
            path="/login"
            element={<Login isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                isAuthenticated={isAuthenticated}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
